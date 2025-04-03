import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (!auth.token) {
            navigate('/login', { replace: true });
        }
    }, [auth.token, navigate]);

    return children;
};

export default ProtectedRoute;


// const ProtectedRoute = ({ children }) => {
//     const auth = useSelector((state) => state.auth);

//     return auth.token ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;