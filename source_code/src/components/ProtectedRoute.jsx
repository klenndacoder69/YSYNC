import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider.jsx";

// ProtectedRoute Component
const ProtectedRoute = ({ element, allowedRoles }) => {
    // Retrieve accessToken from sessionStorage
    const accessToken = sessionStorage.getItem("accessToken");
    const username = sessionStorage.getItem("username");

    if (!accessToken) {
        console.log("No access token found, redirecting to login");
        return <Navigate to="/login" replace />;
    }

    // Retrieve the user's role from sessionStorage or decode the JWT if required
    // Assuming the user's role is still part of `auth` in context for now
    const { auth } = useContext(AuthContext);

    // Ensure auth is consistent if still using context for role checks
    if (allowedRoles && (!auth || !allowedRoles.includes(auth.role))) {
        console.log("User role is not allowed, redirecting to unauthorized");
        return <Navigate to="/unauthorized" replace />;
    }

    // If username is not already in sessionStorage, store it
    if (!username && auth?.email) {
        sessionStorage.setItem("username", auth.email.replace("@up.edu.ph", "").trim());
    }

    return element; // Render the protected component
};

export default ProtectedRoute;
