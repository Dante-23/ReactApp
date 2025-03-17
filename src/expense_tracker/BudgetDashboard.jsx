import React, { useState } from 'react'
import NavBar from '../comps/NavBar';
import { Button, Card, Container, Modal, ProgressBar, Stack, Form } from 'react-bootstrap';

const BudgetDashboard = () => {
  return (
    <>
        <NavBar/>
        <BudgetComponent/>
    </>
  )
}

const BudgetComponent = () => {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    return (
        <>
        <Container className='my-4'>
            <Stack direction='horizontal' gap="2" className='mb-4 bg-dark rounded p-2'>
                <h1 className='me-auto text-white p-2'>Budget App</h1>
                <Button variant='primary' onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
                <Button variant='outline-primary'>Add Expense</Button>
            </Stack>
            <div 
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "1rem",
                    alignItems: "flex-start"
                }}
            >
                <BudgetCard
                    name="Essentials"
                    amount="300"
                    maxAmount="1000"
                ></BudgetCard>
                <BudgetCard
                    name="Essentials"
                    amount="300"
                    maxAmount="1000"
                ></BudgetCard>
                <BudgetCard
                    name="Essentials"
                    amount="300"
                    maxAmount="1000"
                ></BudgetCard>
                <BudgetCard
                    name="Essentials"
                    amount="300"
                    maxAmount="1000"
                ></BudgetCard>
                <BudgetCard
                    name="Essentials"
                    amount="300"
                    maxAmount="1000"
                ></BudgetCard>
            </div>
        </Container>
        <AddExpenseModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
        </>
    );
}

const BudgetCard = ({name, amount, maxAmount}) => {
    const getProgressBarVariant = (amount, maxAmount) => {
        const ratio = amount / maxAmount;
        if (ratio < 0.5) return "primary";
        else if (ratio < 0.75) return "warning";
        else return "danger";
    }
  return (
    <Card>
        <Card.Body>
            <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                <div className='me-2'>{name}</div>
                <div className='d-flex align-items-baseline'>Rs. {amount}
                    <span className='text-muted fs-6 ms-1'>/ Rs. {maxAmount}</span>
                </div>
            </Card.Title>
            <ProgressBar
                className='rounded-pill'
                variant={getProgressBarVariant(amount, maxAmount)}
                min={0}
                max={maxAmount}
                now={amount}
            />
            <Stack direction='horizontal' gap="2" className='mt-4'>
                <Button variant='outline-primary'>Add Expense</Button>
                <Button variant='outline-secondary'>View Expenses</Button>
            </Stack>
        </Card.Body>
    </Card>
  )
}

const AddBudgetModal = ({show, handleClose}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Maximum spending</Form.Label>
                        <Form.Control type="number" required/>
                    </Form.Group>
                    <div className='d-flex justify-content-end'>
                        <Button variant='primary' type='submit'>Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
}

const AddExpenseModal = ({show, handleClose}) => {
    const budgets = [
        {
            id: 1,
            name: "Options1"
        },
        {
            id: 2,
            name: "Options2"
        },
        {
            id: 3,
            name: "Options3"
        },
        {
            id: 4,
            name: "Options4"
        },
        {
            id: 5,
            name: "Options5"
        }
    ]
    return (
        <Modal show={show} onHide={handleClose}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Budget</Form.Label>
                        <Form.Select>
                        <option>Uncategorized</option>
                        {budgets.map(budget => (
                            <option key={budget.id} value={budget.id}>
                            {budget.name}
                            </option>
                        ))}
                        </Form.Select>
                    </Form.Group>
                    <div className='d-flex justify-content-end'>
                        <Button variant='primary' type='submit'>Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
}


export default BudgetDashboard
