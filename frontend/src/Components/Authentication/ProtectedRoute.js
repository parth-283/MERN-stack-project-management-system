import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyAuthAsync } from "../../features/auth/authSlice";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (auth.isAuth === null) {
            dispatch(verifyAuthAsync());
        }
    }, [])

    useEffect(() => {
        if (!auth.isAuth) {
            navigate('/login', { replace: true });
        }
    }, [auth.isAuth, navigate]);

    return children;
};

export default ProtectedRoute;


// const ProtectedRoute = ({ children }) => {
//     const auth = useSelector((state) => state.auth);

//     return auth.token ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;