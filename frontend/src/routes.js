import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Task from "./routes/Task";
import Board from "./routes/Board";
import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import ProtectedRoute from "./Components/Authentication/ProtectedRoute";
import PrivateRoute from "./Components/Authentication/PrivateRoute";
import Dashboard from "./features/Dashboard/Dashboard";
import Teams from "./features/Teams";
import Tasks from "./features/Tasks";
import RestrictedPage from "./RestrictedPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/access-denied",
                element: <RestrictedPage />
            },
            {
                path: "/task",
                element: <ProtectedRoute roles={['Manager', 'Team']}> <Tasks /> </ProtectedRoute>
            },
            {
                path: "/dashboard",
                element: <ProtectedRoute roles={['Admin']}> <Dashboard /> </ProtectedRoute>
            },
            {
                path: "/teams",
                element: <ProtectedRoute roles={['Admin', 'Team', 'Manager']}> <Teams /> </ProtectedRoute>
            },
            {
                path: "/board",
                element: <ProtectedRoute roles={['Team']}> <Board /> </ProtectedRoute>
            },
            {
                path: "/login",
                element: <PrivateRoute> <Login /> </PrivateRoute>
            },
            {
                path: "/register",
                element: <PrivateRoute> <Register /> </PrivateRoute>
            }
        ]
    }
]);

export default router;