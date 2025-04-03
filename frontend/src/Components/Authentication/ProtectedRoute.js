import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyAuthAsync } from "../../features/auth/authSlice";

const ProtectedRoute = ({ roles, children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    console.log(auth, roles, "ProtectedRoute");

    useEffect(() => {
        if (auth.isAuth === null) {
            dispatch(verifyAuthAsync());
        }
    }, [])

    useEffect(() => {
        if (!auth.isAuth) {
            navigate('/login', { replace: true });
        }
    }, [auth.isAuth]);

    if (roles && auth?.user?.role) {
        if (!roles.includes(auth.user.role)) {
            navigate('/access-denied');
        }
    }

    return children;
};

export default ProtectedRoute;