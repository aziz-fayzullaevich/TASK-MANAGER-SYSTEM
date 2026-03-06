import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authApi } from "../api/auth-api";
import { notifications } from "@mantine/notifications";
import type { User } from "../types/auth-types";
import { ROUTES } from "../../../shared/constants/routes";

export const authQueries = {
    useLogin: () => {
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: authApi.loginUser,

            onSuccess: (data: User) => {
                if (!data.accessToken) return;
                localStorage.setItem('token', data.accessToken);
                queryClient.invalidateQueries({ queryKey: ['profile'] });
                window.location.replace(ROUTES.PROFILE);
                notifications.show({ title: 'Успех', message: 'Вы вошли!', color: 'green' });
            },

            onError: () => {
                notifications.show({ title: 'Ошибка', message: 'Неверные данные', color: 'red' });
            }
        })
    }
}