import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth.role === allowedRoles || JSON.parse(localStorage.getItem("userData"))?.role === allowedRoles
            ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;