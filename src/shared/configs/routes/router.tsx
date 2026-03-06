import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import MainLayout from "../../layouts/main-layout";
import Products from "../../../pages/products/products";
import Profile from "../../../pages/profile/profile";
import Register from "../../../features/auth/ui/register";
import Login from "../../../features/auth/ui/login";
import { ProtectedRoute } from "../../ui/protected-route";
import Home from "../../../pages/home/home";

export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: ROUTES.PRODUCTS,
                element: (
                    <ProtectedRoute>
                        <Products />
                    </ProtectedRoute>
                ),
            },
            {
                path: ROUTES.PROFILE,
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
            {
                path: ROUTES.REGISTER,
                element: <Register />
            },
            {
                path: ROUTES.LOGIN,
                element: <Login />,
            }
        ]
    }
]);