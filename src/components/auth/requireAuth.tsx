import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth"
import { ReactNode } from "react";

interface AuthProviderProps {
    children: ReactNode;
}

export const RequireAuth = ({ children }: AuthProviderProps) => {
    const auth = useAuth();
    const location = useLocation();

    return auth && auth.user ? children : <Navigate to='/login' state={{path: location.pathname}} />
}