import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../Pages/Home.jsx"; // Ensure this import path is correct
import Login from "../Pages/Login.jsx";
import SignUp from "../Pages/SignUp.jsx";
import AdminPanel from "../Components/AdminPanel.jsx";
import ProductList from "../Pages/ProductList.jsx";
import AdminPrivateRoute from "../Components/AdminPrivateRoute.jsx";
import UserList from "../Components/UserList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup", // Removed leading slash
        element: <SignUp />,
      },
      {
        path: "admin", // Removed leading slash
        element: (
          // <AdminPrivateRoute>
          <AdminPanel />
          // </AdminPrivateRoute>
        ),
        children: [
          {
            path: "all-products", // Removed leading slash
            element: (
              // <AdminPrivateRoute>
              <ProductList />
              //  </AdminPrivateRoute>
            ),
          },
          {
            path: "all-users",
            element: <UserList />,
          },
        ],
      },
    ],
  },
]);

export default router;
