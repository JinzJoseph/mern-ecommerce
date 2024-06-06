import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../Pages/Home.jsx";  // Ensure this import path is correct
import Login from "../Pages/Login.jsx";
import SignUp from "../Pages/SignUp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      }
    ]
  }
]);

export default router;
