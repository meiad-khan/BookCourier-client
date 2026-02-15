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
import PaymentSuccessful from "../Pages/Dashboard/PaymentSuccess/PaymentSuccessful";
import PaymentFailed from "../Pages/Dashboard/PaymentFailed/PaymentFailed";
import EditBook from "../Pages/Dashboard/EditBook/EditBook";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AllUser from "../Pages/Dashboard/All User/AllUser";
import ManageBooks from "../Pages/Dashboard/ManageBooks/ManageBooks";
import PrivateRoute from "./PrivateRoute";
import Forbidden from "../Pages/Dashboard/Forbidden/Forbidden";
import AdminRoute from "./AdminRoute";
import DashboardHomeRedirect from "../Pages/Dashboard/DashboardHomeRedirect/DashboardHomeRedirect";
import LibrarianRoute from "./LibrarianRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "all-books",
        element: <AllBooks></AllBooks>,
      },
      {
        path: "book-details/:id",
        element: (
          <PrivateRoute>
            <BookDetails></BookDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHomeRedirect></DashboardHomeRedirect>,
      },
      {
        path: "my-orders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "invoice",
        element: <Invoice></Invoice>,
      },
      {
        path: "add-book",
        element: (
          <LibrarianRoute>
            <AddBook></AddBook>
          </LibrarianRoute>
        ),
      },
      {
        path: "my-books",
        element: (
          <LibrarianRoute>
            <MyBooks></MyBooks>
          </LibrarianRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <LibrarianRoute>
            <Orders></Orders>
          </LibrarianRoute>
        ),
      },
      {
        path: "payment-success",
        element: <PaymentSuccessful></PaymentSuccessful>,
      },
      {
        path: "payment-cancelled",
        element: <PaymentFailed></PaymentFailed>,
      },
      {
        path: "edit-book/:id",
        element: (
          <LibrarianRoute>
            <EditBook></EditBook>
          </LibrarianRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUser></AllUser>
          </AdminRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <AdminRoute>
            <ManageBooks></ManageBooks>
          </AdminRoute>
        ),
      },
      // {
      //   path: '*',
      //   element: <ErrorPage></ErrorPage>
      // }
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;