import { api } from "../../../shared/configs/api/api";
import type { Products } from "../types/products-types";

export const productsApi = {
    getAll: async ({ skip, limit }: { skip: number, limit: number }) => {
        try {
            const { data } = await api.get<{
                products: Products[];
                total: number;
            }>('/products', {
                params: { skip, limit }
            });
            return data;
        } catch (error) {
            throw error
        }
    },

    getOne: async ({ id }: { id: number }) => {
        try {
            const { data } = await api.get<Products>(`/products/${id}`);
            return data;
        }
        catch (error) {
            throw error
        };
    },

    delete: async ({ id }: { id: number }) => {
        try {
            const { data } = await api.delete(`/products/${id}`);
            return data;
        }
        catch (error) {
            throw error
        };
    },

    create: async ({ body }: { body: Partial<Products> }) => {
        try {
            const { data } = await api.post<{ users: Partial<Products> }>('/products/add', body);
            return data.users;
        } catch (error) {
            throw error
        }
    },

    update: async ({ id, payload }: { id: number, payload: Partial<Products> }) => {
        try {
            const { data } = await api.put<Products>(`/products/${id}`, payload);
            return data
        } catch (error) {
            throw error
        }
    }
};