import logo from './logo.svg';
import './App.css';
import SignUp from './signup-signin/SignUp.jsx'
import SignIn from './signup-signin/SignIn.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TodoPage from './todo/TodoPage.jsx';
import ProfileDashboard from './dashboard/ProfileDashboard.jsx';
import TodoTest from './todo/TodoTest.jsx';
import TodoTest1 from './todo/TodoTest1.jsx';
import BudgetDashboard from './expense_tracker/BudgetDashboard.jsx';

function App() {
  const myRoute = createBrowserRouter([
    {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: "/signin",
      element: <SignIn />
    },
    {
      path: "/todo",
      element: <TodoTest1 />
    },
    {
      path: "/profile",
      element: <ProfileDashboard />
    },
    {
      path: "/budget",
      element: <BudgetDashboard />
    },
    {
      path: "/",
      element: <h1>Put a authenticated page here</h1>
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={myRoute}></RouterProvider>
    </div>
  );
}

export default App;
