import { api } from "../../../shared/configs/api/api"
import type { User } from "../types/auth-types"

export const authApi = {
    loginUser: async ({ data }: { data: Partial<User> }) => {
        try {
            const res = await api.post('/auth/login', {
                username: data.username,
                password: data.password
            });
            return res.data
        } catch (error) {
            throw error;
        };
    },
}