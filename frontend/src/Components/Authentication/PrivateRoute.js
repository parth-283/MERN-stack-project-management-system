import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (auth.token) {
            navigate('/dashboard', { replace: true });
        }
    }, [auth.token, navigate]);

    return children;
};

// const PrivateRoute = ({ children }) => {
//     const auth = useSelector((state) => state.auth);

//     return !auth.token ? children : <Navigate to="/dashboard" />;
// };

export default PrivateRoute;