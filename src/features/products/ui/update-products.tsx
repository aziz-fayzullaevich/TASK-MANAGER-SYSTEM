import { useNavigate, useParams } from "react-router-dom";
import { productsQueries } from "../queries/products-queries";
import { useForm } from "react-hook-form";
import type { Products } from "../types/products-types";
import { Center, Loader, useMantineTheme } from "@mantine/core";
import { ProductsForm } from "./products-form";
import { ROUTES } from "../../../shared/constants/routes";

const UpdateProducts = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: product, isLoading } = productsQueries.useFetchOneProduct({ id: Number(id) });
    const { mutate: updateProduct, isPending } = productsQueries.useUpdateProduct();
    const theme = useMantineTheme();

    const form = useForm<Partial<Products>>({
        defaultValues: {
            title: product?.title,
            description: product?.description,
            category: product?.category,
            price: product?.price,
            brand: product?.brand
        }
    });

    const onSubmit = (data: Partial<Products>) => {
        updateProduct({ id: Number(id), payload: data }, {
            onSuccess: () => {
                form.reset();
                navigate(ROUTES.PRODUCTS)
            }
        })
    };

    if (isLoading) return (
        <Center>
            <Loader c={theme.colors.orange[6]} size={'lg'} />
        </Center>
    )

    return (
        <ProductsForm
            methods={form}
            onSubmit={onSubmit}
            isPending={isPending}
        />
    )
}

export default UpdateProducts;