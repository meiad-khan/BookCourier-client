import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AllBooks from "../Pages/AllBooks/AllBooks";
import DashboardLayout from "../Layouts/DashboardLayout";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true, 
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: 'all-books',
        element: <AllBooks></AllBooks>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: 'my-orders',
        element: <h3>My orders here..</h3>
      }
    ]
  }
])

export default router;