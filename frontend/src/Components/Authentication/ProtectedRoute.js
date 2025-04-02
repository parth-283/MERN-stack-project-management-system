import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    let auth = useSelector((state) => state.auth)

    useEffect(() => {
        if (!auth.token) {
            navigate('/login')
        }
    }, [auth.token, navigate])

    return children;
}

export default ProtectedRoute;