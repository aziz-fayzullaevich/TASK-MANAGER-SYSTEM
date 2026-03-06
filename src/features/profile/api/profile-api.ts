import { api } from "../../../shared/configs/api/api"
import type { Profile } from "../types/profile-types";

export const profileApi = {
    getUser: async () => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const { data } = await api.get<Profile>('/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return data;
        } catch (error) {
            localStorage.removeItem('token');
            return null;
        };
    },
};