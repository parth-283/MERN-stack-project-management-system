import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Task from "./routes/Task";
import Dashboard from "./routes/Dashboard";
import Board from "./routes/Board";
import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import ProtectedRoute from "./Components/Authentication/ProtectedRoute";
import PrivateRoute from "./Components/Authentication/PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/task",
                element: <ProtectedRoute> <Task /> </ProtectedRoute>
            },
            {
                path: "/dashboard",
                element: <ProtectedRoute> <Dashboard /> </ProtectedRoute>
            },
            {
                path: "/board",
                element: <ProtectedRoute> <Board /> </ProtectedRoute>
            },
            {
                path: "/login",
                element: <PrivateRoute> <Login /> </PrivateRoute>
            },
            {
                path: "/register",
                element: <PrivateRoute> <Register /> </PrivateRoute>
            },
        ]
    }
]);

export default router;