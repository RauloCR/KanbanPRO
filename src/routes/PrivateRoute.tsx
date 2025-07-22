import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

const PrivateRoute = ({ children }: { children: ReactElement }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;