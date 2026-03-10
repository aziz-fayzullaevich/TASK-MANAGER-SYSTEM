import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { productsApi } from "../api/products-api"
import { notifications } from "@mantine/notifications";
import type { Products } from "../types/products-types";

export const productsQueries = {
    useFetchProducts: ({ page, pageSize }: { page: number, pageSize: number }) => {
        const skip = (page - 1) * pageSize;
        return useQuery({
            queryKey: ['products', skip, pageSize],
            queryFn: () => productsApi.getAll({ skip, limit: pageSize }),
            staleTime: 60_000,
            placeholderData: keepPreviousData
        })
    },

    useFetchOneProduct: ({ id }: { id: number }) => {
        return useQuery({
            queryKey: ['products'],
            queryFn: () => productsApi.getOne({ id }),
            enabled: !!id
        })
    },

    useDeleteProduct: () => {
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: ({ id }: { id: number }) => productsApi.delete({ id }),

            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['products'] })

                notifications.show({
                    title: 'Успешно!',
                    message: 'Продукт успешно удалён',
                    color: 'green'
                });
            },

            onError: (err) => {
                notifications.show({
                    title: 'Ошибка!',
                    message: err.message || 'Ошибка при удалении продукта',
                    color: 'red'
                });
            }
        })
    },

    useCreateProduct: () => {
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: ({ body }: { body: Partial<Products> }) => productsApi.create({ body }),

            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['products'] })

                notifications.show({
                    title: 'Успешно!',
                    message: 'Продукт успешно добавлен',
                    color: 'green'
                });
            },

            onError: (err) => {
                notifications.show({
                    title: 'Ошибка!',
                    message: err.message || 'Ошибка при добавлении продукта',
                    color: 'red'
                });
            }
        })
    },

    useUpdateProduct: () => {
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: ({ id, payload }: { id: number, payload: Partial<Products> }) => productsApi.update({ id, payload }),

            onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey: ['products', data?.id] })

                notifications.show({
                    title: 'Успешно!',
                    message: 'Продукт успешно обнавлен',
                    color: 'green'
                });
            },

            onError: (err) => {
                notifications.show({
                    title: 'Ошибка!',
                    message: err.message || 'Ошибка при обнавлении продукта',
                    color: 'red'
                });
            }
        })
    },
}