import React, { useState, useEffect } from 'react'
import NavBar from '../comps/NavBar';
import { Button, Card, Container, Modal, ProgressBar, Stack, Form } from 'react-bootstrap';
import { isAuthenticated } from '../scripts/Auth';
import { addExpenseOfUser, deleteExpenseOfUser, getAllBudgetsOfUser, getAllExpensesGivenBudgetOfUser, getAllExpensesOfUser } from '../scripts/Expense';
import ErrorPopUpComponent from '../comps/PopUp';

const BudgetDashboard = () => {
  return (
    <>
        <NavBar/>
        {
            isAuthenticated() ?
            (<BudgetComponent/>) :
            (<></>)
        }
    </>
  )
}

const BudgetComponent = () => {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [budgets, setBudgets] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const budgets = await getAllBudgetsOfUser();
            for (const budget of budgets) {
                setBudgets((prevBudgets) => [...prevBudgets, budget]);
            }
        }
        fetchData();
    }, []);
    const onAddBudget = (name, maxAmount) => {
        const budget = {
            budgetName: name,
            amount: 0,
            maxAmount: maxAmount
        }
        setBudgets((prevBudgets) => [...prevBudgets, budget]);
        setShowAddBudgetModal(false);
    }
    return (
        <>
        <Container className='my-4'>
            <Stack direction='horizontal' gap="2" className='mb-4 bg-dark rounded p-2'>
                <h1 className='me-auto text-white p-2'>Budget App</h1>
                <Button variant='primary' onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
            </Stack>
            <div 
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "1rem",
                    alignItems: "flex-start"
                }}
            >
                {
                    budgets.map((budget, index) => {
                        return (
                            <BudgetCard
                                name={budget.budgetName}
                                amount={budget.amount}
                                maxAmount={budget.maxAmount}
                            />
                        )
                    })
                }
            </div>
        </Container>
        {/* <AddExpenseModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} /> */}
        {/* <ViewExpenseModal /> */}
        <AddBudgetModal
            show={showAddBudgetModal}
            handleClose={() => setShowAddBudgetModal(false)}
            callback={onAddBudget}
        />
        </>
    );
}

const BudgetCard = ({name, amount, maxAmount}) => {
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [displayExpenseAmount, setDisplayExpenseAmount] = useState(amount);
    const [showErrorPopUp, setShowErrorPopUp] = useState(false);
    const getProgressBarVariant = (amount, maxAmount) => {
        const ratio = amount / maxAmount;
        if (ratio < 0.5) return "primary";
        else if (ratio < 0.75) return "warning";
        else return "danger";
    }
    const onAddExpense = async (expenseName, expenseAmount) => {
        if (parseInt(displayExpenseAmount) + parseInt(expenseAmount) > maxAmount) {
            setShowAddExpenseModal(false);
            setShowErrorPopUp(true);
            return;
        }
        const expense = await addExpenseOfUser(expenseName, expenseAmount, name);
        if (expense != -1) {
            setExpenses((prevExpenses) => [...prevExpenses, expense]);
            setDisplayExpenseAmount((prevAmount) => prevAmount + expense.amount);
        }
        setShowAddExpenseModal(false);
    }
    useEffect(() => {
        async function fetchData() {
            const expenses = await getAllExpensesGivenBudgetOfUser(name);
            console.log(expenses);
            for (const expense of expenses) {
                setExpenses((prevExpenses) => [...prevExpenses, expense]);
            }
        }
        fetchData();
    }, []);
    const onDeleteExpense = async (expenseId, expenseAmount) => {
        const response = await deleteExpenseOfUser(expenseId);
        if (response != -1) {
            setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId));
            setDisplayExpenseAmount((prevAmount) => prevAmount - expenseAmount);
        }
        setShowViewExpenseModal(false);
    }
  return (
    <>
    <Card>
        <Card.Body>
            <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                <div className='me-2'>{name}</div>
                <div className='d-flex align-items-baseline'>Rs. {parseInt(displayExpenseAmount)}
                    <span className='text-muted fs-6 ms-1'>/ Rs. {maxAmount}</span>
                </div>
            </Card.Title>
            {<ProgressBar
                className='rounded-pill'
                variant={getProgressBarVariant(parseInt(displayExpenseAmount), maxAmount)}
                min={0}
                max={maxAmount}
                now={parseInt(displayExpenseAmount)}
            />}
            <Stack direction='horizontal' gap="2" className='mt-4'>
                <Button variant='outline-primary' onClick={() => setShowAddExpenseModal(true)}>Add Expense</Button>
                <Button variant='outline-secondary' onClick={() => setShowViewExpenseModal(true)}>View Expenses</Button>
            </Stack>
        </Card.Body>
    </Card>
    <AddExpenseModal show={showAddExpenseModal} handleClose={() => setShowAddExpenseModal(false)} callback={onAddExpense}/>
    <ViewExpenseModal show={showViewExpenseModal} handleClose={() => setShowViewExpenseModal(false)} expenses={expenses}
    deleteCallback={onDeleteExpense}
    />
    <ErrorPopUpComponent 
    show={showErrorPopUp}
    handleClose={() => setShowErrorPopUp(false)}
    title="Error"
    message="Total expense price cannot be greater than budget price. "
    />
    </>
  )
}

const AddBudgetModal = ({show, handleClose, callback}) => {
    const [name, setName] = useState('');
    const [maxAmount, setMaxAmount] = useState(1);
    const handleAddButtonClick = () => {
        if (name.trim()) {
            setName('');
            setMaxAmount(1);
            callback(name, maxAmount);
        } else {
          alert('Please enter a name.');
        }
    };
    const handleNameInputChange = (e) => {
        setName(e.target.value);
    };
    const handleMaxAmountInputChange = (e) => {
        setMaxAmount(e.target.value);
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={handleNameInputChange} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Maximum spending</Form.Label>
                        <Form.Control type="number" value={maxAmount} onChange={handleMaxAmountInputChange} required/>
                    </Form.Group>
                    <div className='d-flex justify-content-end'>
                        <Button variant='primary' type='button' onClick={handleAddButtonClick}>Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
}

const AddExpenseModal = ({show, handleClose, callback}) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(1);
    const handleAddButtonClick = () => {
        if (name.trim()) {
            setName('');
            setAmount(1);
            callback(name, amount);
        } else {
          alert('Please enter a name.');
        }
    };
    const handleNameInputChange = (e) => {
        setName(e.target.value);
    };
    const handleAmountInputChange = (e) => {
        setAmount(e.target.value);
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={handleNameInputChange} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" value={amount} onChange={handleAmountInputChange} required/>
                    </Form.Group>
                    <div className='d-flex justify-content-end'>
                        <Button variant='primary' type='button' onClick={handleAddButtonClick}>Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
}

const ViewExpenseModal = ({show, handleClose, expenses, deleteCallback}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                <Stack direction="horizontal" gap="2">
                    <div>Expenses - Test</div>
                    <Button
                        variant="outline-danger"
                    >
                        Delete
                    </Button>
                </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap="3">
                    {
                        expenses.map((expense, index) => {
                            return (
                                <Stack direction="horizontal" gap="2">
                                    <div className="me-auto fs-4">{expense.description} - {expense.amount}</div>
                                    <div className="fs-5">
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="outline-danger"
                                        onClick={() => deleteCallback(expense.id, expense.amount)}
                                    >
                                        &times;
                                    </Button>
                                </Stack>
                            )
                        })
                    }
                </Stack>
            </Modal.Body>
            </Modal>
    )
}


export default BudgetDashboard
