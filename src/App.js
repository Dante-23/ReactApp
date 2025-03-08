import logo from './logo.svg';
import './App.css';
import SignUp from './signup-signin/SignUp.jsx'
import SignIn from './signup-signin/SignIn.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

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
