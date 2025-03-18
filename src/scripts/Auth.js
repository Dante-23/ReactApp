import { resetExpenses } from "./Expense";

let todos = null;

export const storeAuthDataAsCookies = (authData) => {
    // document.cookie = "username="+authData['JwtToken']+"";
    document.cookie = "username="+authData['username']+",token="+authData['jwtToken']+",id="+authData['id'];
}

export const parseCookie = () => {
    if (document.cookie === "") return null;
    const cookies = document.cookie
    .split(',')
    .map(cookie => cookie.split('='))
    .reduce((acc, [key, value]) => {
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
    return {
        username: cookies.username,
        token: cookies.token,
        id: cookies.id
    };
}

export const deleteAuthDataAsCookies = () => {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    todos = null;
    resetExpenses();
}

export const isAuthenticated = () => {
    if (document.cookie === "") return false;
    else return true;
}

export const addTodoTaskToBackend = (task) => {
    console.log("Adding task: " + task);
}

export const deleteTodoTaskToBackend = (task) => {
    console.log("Deleting task: " + task);
}

export const fetchUserDetails = async () => {
    const userDetail = parseCookie();
    const url = "http://localhost:5110/api/User/" + userDetail['id'];
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
    console.log(json);
    if (response.ok) {
        return {
            username: json['username'],
            fullname: json['name'],
            email: json['email'],
            password: json['password']
        }
    } else {
        alert("Auth failed");
    }
    } catch (error) {
        console.error(error.message);
    }
}

export const signupUser = async () => {
    
}

export const updateFullname = async (newFullname) => {
    const userDetail = parseCookie();
    const url = "http://localhost:5110/api/User/" + userDetail['id'] + "?newName=" + newFullname;
    console.log(url);
    try {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userDetail['token']}`,
        // Add other headers as needed
        }
    });
    const json = await response.json();
    console.log(json);
    if (response.ok) {
        alert("Fullname updated");
    } else {
        alert("Auth failed");
    }
    } catch (error) {
        console.error(error.message);
    }
}

export const deleteUser = async () => {
    const userDetail = parseCookie();
    const url = "http://localhost:5110/api/User/" + userDetail['id'];
    console.log(url);
    try {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userDetail['token']}`,
        // Add other headers as needed
        }
    });
    const json = await response.json();
    console.log(json);
    if (response.ok) {
        alert("User deleted");
    } else {
        alert("Auth failed");
    }
    } catch (error) {
        console.error(error.message);
    }
}

export const getAllTodosOfUser = async() => {
    const userDetail = parseCookie();
    const url = "http://localhost:5196/api/Todo/" + userDetail['id'];
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
        console.log(json);
        if (response.ok) {
            todos = json;
            return json;
        } else {
            alert("Auth failed");
        }
    } catch (error) {
        console.error(error.message);
    }
}

export const getAllCategoriesOfUser = async () => {
    if (todos == null) {
        await getAllTodosOfUser();
    }
    const categories = new Set();
    todos.map((todo, index) => {
        categories.add(todo.category);
    })
    return categories;
}

export const getAllTodoGivenCategoryOfUser = async (category) => {
    if (todos == null) {
        await getAllTodosOfUser();
    }
    const resTodos = [];
    todos.map((todo, index) => {
        if (todo.category === category) {
            resTodos.push(todo);
        }
    })
    return resTodos;
}

/* 

"Username": "test",
"UserId": "5",
"Description": "Pray"
*/

export const addTodoOfUser = async (taskName, categoryName) => {
    const userDetail = parseCookie();
    const url = "http://localhost:5196/api/Todo";
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
                Description: taskName,
                Category: categoryName
                // Include other data as needed
            }),
        });
        const json = await response.json();
        console.log(json);
        if (response.ok) {
            alert("Todo added successfully");
            return json.id;
        } else {
            alert("Auth failed");
            return -1;
        }
    } catch (error) {
        console.error(error.message);
        return -1;
    }
}

export const deleteTodoOfUser = async (todoId) => {
    const userDetail = parseCookie();
    const url = "http://localhost:5196/api/Todo";
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userDetail['token']}`,
            // Add other headers as needed
            },
            body: JSON.stringify({
                UserId: userDetail['id'],
                Id: todoId
                // Include other data as needed
            }),
        });
        if (response.ok) {
            alert("Todo deleted successfully");
            return true;
        } else {
            alert("Auth failed");
            return false;
        }
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

export const updateTodoOfUser = async (todoId, description) => {
    const userDetail = parseCookie();
    const url = "http://localhost:5196/api/Todo";
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userDetail['token']}`,
            // Add other headers as needed
            },
            body: JSON.stringify({
                Id: todoId,
                UserId: userDetail['id'],
                Description: description
                // Include other data as needed
            }),
        });
        if (response.ok) {
            alert("Todo updated successfully");
            return true;
        } else {
            alert("Auth failed");
            return false;
        }
    } catch (error) {
        console.error(error.message);
        return false;
    }
}