import React from "react";
import NavBar from "../comps/NavBar";
import { Container, ListGroup, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { addTodoOfUser, getAllTodosOfUser, isAuthenticated } from "../scripts/Auth";

export default function TodoTest1() {
  return (
    <>
    <NavBar/>
    {
        isAuthenticated() ?
        (<TodosComponent/>) :
        (<></>)
    }
    </>
  );
}

const TodosComponent = () => {
    const [id, setId] = useState(0);
    const [todos, setTodos] = useState([]);
    const onAddButtonClicked = async () => {
        console.log("onSubmitButtonClicked");
        setId((prevId) => prevId + 1);
        // const taskIdFromServer = await addTodoOfUser(document.getElementById("idAddTask").value);
        // const newTodo = { taskId: taskIdFromServer, taskName: document.getElementById("idAddTask").value };
        // setTodos((prevTodos) => [...prevTodos, newTodo]);
        const taskIdFromServer = await addTodoOfUser(document.getElementById("idAddTask").value);
        if (taskIdFromServer != -1) {
            const newTodo = { taskId: taskIdFromServer, taskName: document.getElementById("idAddTask").value };
            setTodos((prevTodos) => [...prevTodos, newTodo]);
        }
        document.getElementById("idAddTask").value = "";

    }
    const onDeleteButtonClicked = (todoId) => {
        console.log("onDeleteButtonClicked with todoId: " + todoId);
        // setTodos((prevTodos) => prevTodos.filter((todo) => todo.taskId !== todoId));
    }

    useEffect(() => {
        async function fetchData() {
            const userTodos = await getAllTodosOfUser();
            userTodos.forEach((todo, index) => {
                const newTodo = { taskId: todo.id, taskName: todo.description };
                setTodos((prevTodos) => [...prevTodos, newTodo]);
            });
        }
        fetchData();
      }, []);
    return (
        <>
        {
            isAuthenticated() ?
            (<div className="container my-5">
                <div className="mx-auto rounded border p-4 w-75" style={{backgroundColor: "black"}}>
                    <h2 className="text-white text-center mb-3">Todo list</h2>
                    <form className="d-flex">
                        <input id="idAddTask" className="form-control me-2" placeholder="Add task" />
                        <button type="button" className="btn btn-primary btn-block" onClick={onAddButtonClicked}>Add</button>
                    </form>
                    {
                        todos.map((todo, index) => {
                            return (
                                <div key={index} className="rounded mt-4 p-1 d-flex"
                                style={{backgroundColor: "white"}}
                                >
                                    <div className="me-auto m-2">
                                        {todo.taskName}
                                    </div>
                                    <button type="button" className="btn btn-danger btn-block" onClick={() => onDeleteButtonClicked(todo.taskId)}>Delete</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>) :
            (<></>)
        }
        </>
    )
}