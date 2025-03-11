export const storeAuthDataAsCookies = (authData) => {
    // document.cookie = "username="+authData['JwtToken']+"";
    document.cookie = "username="+authData['username']+",token="+authData['jwtToken']+",id="+authData['id'];
}

const parseCookie = () => {
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
            return json;
        } else {
            alert("Auth failed");
        }
    } catch (error) {
        console.error(error.message);
    }
}

/* 

"Username": "test",
"UserId": "5",
"Description": "Pray"
*/

export const addTodoOfUser = async (taskName) => {
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
                Description: taskName
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