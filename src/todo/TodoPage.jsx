import React, { useState } from 'react';
import { Container, Row, Col, Card, Navbar, Nav, Button } from 'react-bootstrap';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useNavigate, Link } from 'react-router-dom';
import { deleteAuthDataAsCookies, isAuthenticated } from '../scripts/Auth';

const TodoPage = () => {
    const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  const addTodo = (task) => {
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
    <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
        <Navbar.Brand href="#home">My To-Do App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Nav>
            {
                isAuthenticated() ? 
                (<Button variant="outline-light" onClick={onLogoutButtonClicked}>
                    Logout
                </Button>) :
                (<Button onClick={() => navigate("/signin")} variant="outline-light">
                    Login
                </Button>)
            }
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
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
