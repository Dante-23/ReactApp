import React, { useState } from 'react';
import { Container, Row, Col, Card, Navbar, Nav, Button } from 'react-bootstrap';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useNavigate, Link } from 'react-router-dom';
import { addTodoTaskToBackend, deleteAuthDataAsCookies, isAuthenticated } from '../scripts/Auth';
import NavBar from '../comps/NavBar';

const TodoPage = () => {
    const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  const addTodo = (task) => {
    addTodoTaskToBackend(task);
    const newTodos = [...todos, { text: task, isCompleted: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const onLogoutButtonClicked = () => {
    deleteAuthDataAsCookies();
    navigate("/signin");
  }

  return (
    <>
    <NavBar/>
    {
        isAuthenticated() ?
        (<Container className="mt-5">
        <Row>
            <Col md={{ span: 6, offset: 3 }}>
            <Card>
                <Card.Body>
                <Card.Title>To-Do List</Card.Title>
                <TodoForm addTodo={addTodo} />
                <TodoList
                    todos={todos}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                />
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>) : (<></>)
    }
    </>
  );
};

export default TodoPage;
