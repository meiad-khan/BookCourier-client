import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AllBooks from "../Pages/AllBooks/AllBooks";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import Invoice from "../Pages/Dashboard/Invoice/Invoice";
import AddBook from "../Pages/Dashboard/AddBook/AddBook";
import MyBooks from "../Pages/Dashboard/MyBooks/MyBooks";
import Orders from "../Pages/Dashboard/Orders/Orders";
import BookDetails from "../Pages/BookDetails/BookDetails";

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
      },
      {
        path: 'all-books/:id',
        element: <BookDetails></BookDetails>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: 'my-orders',
        element: <MyOrders></MyOrders>
      },
      {
        path: 'my-profile',
        element: <MyProfile></MyProfile>
      },
      {
        path: 'invoice',
        element: <Invoice></Invoice>
      },
      {
        path: 'add-book',
        element: <AddBook></AddBook>
      },
      {
        path: 'my-books',
        element:<MyBooks></MyBooks>
      },
      {
        path: 'orders',
        element: <Orders></Orders>
      }
    ]
  }
])

export default router;