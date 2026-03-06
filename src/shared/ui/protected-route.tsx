import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../constants/routes";

type Props = {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
    const token = localStorage.getItem("token");
    const location = useLocation();

    if (!token) {
        return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    return <>{children}</>;
};