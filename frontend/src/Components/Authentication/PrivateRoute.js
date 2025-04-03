import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyAuthAsync } from "../../features/auth/authSlice";

const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (auth.isAuth !== false) {
            return;
        }
        dispatch(verifyAuthAsync())
    }, [])

    useEffect(() => {
        if (auth.isAuth) {
            navigate('/dashboard', { replace: true });
        }
    }, [auth.isAuth, navigate]);

    return children;
};

export default PrivateRoute;