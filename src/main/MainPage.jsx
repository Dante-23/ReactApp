import React from 'react'
import NavBar from '../comps/NavBar.jsx';
import { isAuthenticated, storeAuthDataAsCookies } from '../scripts/Auth.js';
import { Button, Card, Container, Modal, ProgressBar, Stack, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  return (
    <>
        <NavBar/>
        {
            isAuthenticated() ?
            (<AppsComponent/>) :
            (<></>)
        }
    </>
  )
}

const AppsComponent = () => {
    return (
        <>
        <Container className='my-4'>
            <Stack direction='horizontal' gap="2" className='mb-4 bg-dark rounded p-2'>
                <h1 className='me-auto text-white p-2'>My Webapps</h1>
            </Stack>
            <div 
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "1rem",
                    alignItems: "flex-start"
                }}
            >
                <AppCard 
                name="Todo App"
                navigateTo="/todo"
                />
                <AppCard 
                name="Budget App"
                navigateTo="/budget"
                />
            </div>
        </Container>
        </>
    )
}

const AppCard = ({name, navigateTo}) => {
    const navigate = useNavigate();
    return (
        <>
        <Card>
            <Card.Body>
                <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                    <div className='me-2'>{name}</div>
                </Card.Title>
                <Stack direction='horizontal' gap="2" className='mt-4'>
                    <Button variant='outline-primary' onClick={() => navigate(navigateTo)}>Go to {name}</Button>
                </Stack>
            </Card.Body>
        </Card>
        </>
    )
}

export default MainPage
