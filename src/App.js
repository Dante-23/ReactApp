import logo from './logo.svg';
import './App.css';
import SignUp from './signup-signin/SignUp.jsx'
import SignIn from './signup-signin/SignIn.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProfileDashboard from './dashboard/ProfileDashboard.jsx';
import TodoPage from './todo/TodoPage.jsx';
import BudgetDashboard from './expense_tracker/BudgetDashboard.jsx';
import MainPage from './main/MainPage.jsx';

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
      element: <TodoPage />
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
      element: <MainPage/>
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={myRoute}></RouterProvider>
    </div>
  );
}

export default App;
