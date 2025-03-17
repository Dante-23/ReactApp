import React from "react";
import NavBar from "../comps/NavBar";
import { Container, Button, Form, Card, Stack, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { addTodoOfUser, deleteTodoOfUser, getAllCategoriesOfUser, getAllTodoGivenCategoryOfUser, getAllTodosOfUser, isAuthenticated, updateTodoOfUser } from "../scripts/Auth";

export default function TodoTest1() {
  return (
    <>
    <NavBar/>
    {
        isAuthenticated() ?
        (<TodosMainComponent/>) :
        (<></>)
    }
    </>
  );
}

const TodosMainComponent = () => {
    const [showAddTodoCategoryModal, setShowAddTodoCategoryModal] = useState(false);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const categories = await getAllCategoriesOfUser();
            for (const category of categories) {
                setCategories((prevCategories) => [...prevCategories, category]);
            }
        }
        fetchData();
    }, []);

    const deleteTodoCategory = async (categoryName) => {
        setCategories((prevCategories) => prevCategories.filter((category) => category !== categoryName));
        window.location.reload();
    }

    const addTodoCategory = (categoryName) => {
        setCategories((prevCategories) => [...prevCategories, categoryName]);
        setShowAddTodoCategoryModal(false);
    }
    return (
        <>
        <Container className='my-4 rounded'>
            <Stack direction='horizontal' gap="2" className='mb-4 bg-dark rounded p-2'>
                <h1 className='me-auto text-white p-2'>Todo App</h1>
                <Button variant='primary' onClick={() => setShowAddTodoCategoryModal(true)}>Add Category</Button>
            </Stack>
        </Container>
        <div className="container"
        style={{
            display: "grid",
            // gridTemplateColumns: "1fr",
            gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start"
        }}
        >
        {
            categories.map((category, index) => {
                return (
                    <TodoCategory
                    categoryName={category}
                    onDeleteCatogory={deleteTodoCategory}
                    />
                )
            })
        }
        </div>
        <AddTodoCategoryModal 
        show={showAddTodoCategoryModal}
        handleClose={() => setShowAddTodoCategoryModal(false)}
        onAddButtonClicked={addTodoCategory}
        />
        </>
    );
}

const TodoCategory = ({categoryName, onDeleteCatogory}) => {
    const [todos, setTodos] = useState([]);
    const [showAddTodoModal, setShowAddTodoModal] = useState(false);
    const onAddTodoButtonClicked = () => {
        setShowAddTodoModal(true);
    }
    const onDeleteCategoryButtonClicked = async () => {
        const deletePromises = todos.map(async (todo, index) => {
            const taskId = todo.taskId;
            const response = await deleteTodoOfUser(taskId);
            if (response) {
                setTodos((prevTodos) => prevTodos.filter((todo) => todo.taskId !== taskId));
            }
        })
        await Promise.all(deletePromises);
        onDeleteCatogory(categoryName);
    }
    const onAddButtonClicked = async (description) => {
        setShowAddTodoModal(false);
        const taskIdFromServer = await addTodoOfUser(description, categoryName);
        if (taskIdFromServer != -1) {
            const newTodo = { taskId: taskIdFromServer, taskName: description };
            setTodos((prevTodos) => [...prevTodos, newTodo]);
        }
    }
    const onDeleteButtonClicked = async (taskId) => {
        const response = await deleteTodoOfUser(taskId);
        if (response) {
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.taskId !== taskId));
        } else {}
        if (todos.length === 1) {
            onDeleteCatogory(categoryName);
        }
    }
    useEffect(() => {
        console.log("Category component for " + categoryName + " ran");
        async function fetchData() {
            const todosInGivenCategory = await getAllTodoGivenCategoryOfUser(categoryName);
            todosInGivenCategory.map((todo, index) => {
                const task = { taskId: todo.id, taskName: todo.description }
                setTodos((prevTodos) => [...prevTodos, task]);
            })
        }
        fetchData();
    }, []);
    return (
        <>
        <Container className='my-4 rounded border border-2 p-2'>
            <Stack direction='horizontal' gap="2" className='mb-2'>
                <h1 className='me-auto p-2'>{categoryName}</h1>
                <Button variant='primary' onClick={() => onAddTodoButtonClicked()}>Add Todo</Button>
                <Button variant='outline-danger' onClick={() => onDeleteCategoryButtonClicked()}>Delete Category</Button>
            </Stack>
            {
                todos.map((todo, index) => {
                    console.log(todo);
                    return(
                        <TodoCard
                        todoName={todo.taskName}
                        todoId={todo.taskId}
                        onDeleteButtonClicked={onDeleteButtonClicked}
                        />
                    )
                })
            }
        </Container>
        <AddTodoModal
        show={showAddTodoModal}
        handleClose={() => setShowAddTodoModal(false)}
        onAddButtonClicked={onAddButtonClicked}
        />
        </>
    );
}

const TodoCard = ({todoName, todoId, onDeleteButtonClicked}) => {
    const [displayTodoName, setDisplayTodoName] = useState(todoName);
    const [showUpdateTodoModal, setShowUpdateTodoModal] = useState(false);
    const onUpdateButtonClicked = (description) => {
        console.log("onUpdateButtonClicked: " + todoId + " " + description);
        setShowUpdateTodoModal(false);
        const response = updateTodoOfUser(todoId, description);
        if (response) {
            setDisplayTodoName(description);
        }
    }
    return (
        <>
        <Card style={{ height: '70px' }}>
            <Card.Body>
                <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-2'>
                    <div>{displayTodoName}</div>
                    <div>
                        <Button variant='outline-primary' className='me-2' onClick={() => setShowUpdateTodoModal(true)}>
                            Edit
                        </Button>
                        <Button variant='outline-danger' onClick={() => onDeleteButtonClicked(todoId)}>
                            Delete
                        </Button>
                    </div>
                </Card.Title>
            </Card.Body>
        </Card>
        <UpdateTodoModal
        show={showUpdateTodoModal}
        handleClose={() => setShowUpdateTodoModal(false)}
        onUpdateButtonClicked={onUpdateButtonClicked}
        displayTodoName={displayTodoName}
        />
        </>
    )
}

const AddTodoModal = ({show, handleClose, onAddButtonClicked}) => {
    const [description, setDescription] = useState('');
    const handleAddButtonClick = () => {
        if (description.trim()) {
            onAddButtonClicked(description);
            setDescription(''); // Clear the input field
        } else {
          alert('Please enter a description.');
        }
    };

    const handleInputChange = (e) => {
        setDescription(e.target.value);
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Add Todo Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={description} onChange={handleInputChange} required/>
                    </Form.Group>
                    <div className='d-flex justify-content-end'>
                        <Button variant='primary' type='button' onClick={handleAddButtonClick}>Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
}

const UpdateTodoModal = ({show, handleClose, onUpdateButtonClicked, displayTodoName}) => {
    const [description, setDescription] = useState(displayTodoName);
    const handleUpdateButtonClick = () => {
        if (description.trim()) {
            onUpdateButtonClicked(description);
            setDescription(''); // Clear the input field
        } else {
          alert('Please enter a description.');
        }
    };

    const handleInputChange = (e) => {
        setDescription(e.target.value);
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Update Todo Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>New description</Form.Label>
                        <Form.Control type="text" value={description} onChange={handleInputChange} required/>
                    </Form.Group>
                    <div className='d-flex justify-content-end'>
                        <Button variant='primary' type='button' onClick={handleUpdateButtonClick}>Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
}

const AddTodoCategoryModal = ({show, handleClose, onAddButtonClicked}) => {
    const [description, setDescription] = useState('');
    const handleAddButtonClick = () => {
        if (description.trim()) {
            onAddButtonClicked(description);
            setDescription(''); // Clear the input field
        } else {
          alert('Please enter a description.');
        }
    };

    const handleInputChange = (e) => {
        setDescription(e.target.value);
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Category name</Form.Label>
                        <Form.Control type="text" value={description} onChange={handleInputChange} required/>
                    </Form.Group>
                    <div className='d-flex justify-content-end'>
                        <Button variant='primary' type='button' onClick={handleAddButtonClick}>Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
}