import { parseCookie } from "./Auth";
import { HTTP_RESPONSE_OK } from "./Constants";

const BASE_URL = "http://localhost:5178/api/Budget/";
export let expenses = null;

export const resetExpenses = () => {
    expenses = null;
}

export const getAllExpensesOfUser = async () => {
    const userDetail = parseCookie();
    const url = BASE_URL + userDetail['id'];
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userDetail['token']}`,
            // Add other headers as needed
            }
        });
        const json = await response.json();
        if (response.ok) {
            expenses = json;
            return json;
        } else {
            alert("Auth failed");
            return -1;
        }
    } catch (error) {
        console.error(error.message);
        return -1;
    }
}

export const getAllExpensesGivenBudgetOfUser = async (budgetName) => {
    if (expenses === null) {
        const response = await getAllExpensesOfUser();
        // if (response.status !== HTTP_RESPONSE_OK) {
        //     return response;
        // }
    }
    const responseExpenses = [];
    expenses.map((expense, index) => {
        if (expense.budget.budgetName === budgetName) {
            responseExpenses.push(expense);
        }
    })
    return responseExpenses;
}

export const getAllBudgetsOfUser = async () => {
    if (expenses === null) {
        await getAllExpensesOfUser();
    }
    const budgetNames = new Set();
    const budgets = new Set();
    expenses.map((expense, index) => {
        if (!budgetNames.has(expense.budget.budgetName)) {
            const budgetToAdd = {
                budgetName: expense.budget.budgetName,
                maxAmount: expense.budget.maxAmount,
                amount: expense.amount
            }
            budgets.add(budgetToAdd);
            budgetNames.add(expense.budget.budgetName);
        } else {
            for (const budget of budgets) {
                if (budget.budgetName === expense.budget.budgetName) {
                    budget.amount += expense.amount;
                    break;
                }
            }
        }
    });
    return budgets;
}

export const addExpenseOfUser = async (expenseName, expenseAmount, budgetName, maxAmount) => {
    const userDetail = parseCookie();
    const url = BASE_URL;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userDetail['token']}`,
            // Add other headers as needed
            },
            body: JSON.stringify({
                Username: userDetail['username'],
                UserId: userDetail['id'],
                Description: expenseName,
                Amount: expenseAmount,
                BudgetName: budgetName,
                MaxAmount: maxAmount
                // Include other data as needed
            }),
        });
        const json = await response.json();
        if (response.ok) {
            return json;
        } else {
            alert("Add failed");
            return -1;
        }
    } catch (error) {
        console.error(error.message);
        return -1;
    }
}

export const deleteExpenseOfUser = async (expenseId) => {
    const userDetail = parseCookie();
    const url = BASE_URL;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userDetail['token']}`,
            // Add other headers as needed
            },
            body: JSON.stringify({
                Username: userDetail['username'],
                UserId: userDetail['id'],
                Id: expenseId
                // Include other data as needed
            }),
        });
        if (response.ok) {
            return 1;
        } else {
            alert("Delete failed");
            return -1;
        }
    } catch (error) {
        console.error(error.message);
        return -1;
    }
}