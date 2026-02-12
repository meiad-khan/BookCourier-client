import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true, 
        element: <h3>Hello world</h3>
      }
    ]
  }
])

export default router;