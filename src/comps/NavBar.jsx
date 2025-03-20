import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { addTodoTaskToBackend, deleteAuthDataAsCookies, isAuthenticated } from '../scripts/Auth';
import { Container, Row, Col, Card, Navbar, Nav, Button } from 'react-bootstrap';

const NavBar = () => {
    const navigate = useNavigate();
    const onLogoutButtonClicked = () => {
        deleteAuthDataAsCookies();
        navigate("/signin");
    }
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand onClick={() => navigate('/')}>My To-Do App</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link onClick={() => navigate("/profile")}>Profile</Nav.Link>
                <Nav.Link onClick={() => navigate("/todo")}>TodoApp</Nav.Link>
                <Nav.Link onClick={() => navigate("/budget")}>BudgetApp</Nav.Link>
                {
                  !isAuthenticated() ?
                  (<Nav.Link onClick={() => navigate("/signup")}>SignUp</Nav.Link>) :
                  (<></>)
                }
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
    </>
  )
}

export default NavBar
