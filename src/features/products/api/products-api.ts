import { api } from "../../../shared/configs/api/api";
import type { Products } from "../types/products-types";

export const productsApi = {
    getAll: async ({ skip, limit }: { skip: number, limit: number }) => {
        try {
            const { data } = await api.get<{
                products: Products;
                total: number;
            }>('/products', {
                params: { skip, limit }
            });
            return data;
        } catch (error) {
            throw error
        }
    }
};