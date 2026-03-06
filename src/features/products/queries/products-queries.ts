import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { productsApi } from "../api/products-api"

export const productsQueries = {
    useFetchProducts: ({ page, pageSize }: { page: number, pageSize: number }) => {
        const skip = (page - 1) * pageSize;
        return useQuery({
            queryKey: ['products', page, pageSize],
            queryFn: () => productsApi.getAll({ skip, limit: pageSize }),
            staleTime: 60_000,
            placeholderData: keepPreviousData
        })
    },
}