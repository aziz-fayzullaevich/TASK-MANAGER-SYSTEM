import { useForm } from "react-hook-form";
import { ProductsForm } from "./products-form";
import type { Products } from "../types/products-types";
import { useNavigate } from "react-router-dom";
import { productsQueries } from "../queries/products-queries";

const CreateProducts = () => {
    const navigate = useNavigate();
    const { mutate: createProduct, isPending } = productsQueries.useCreateProduct();

    const form = useForm<Partial<Products>>({
        defaultValues: {
            title: '',
            description: '',
            category: '',
            price: null,
            brand: '',
        }
    });

    const onSubmit = (data: Partial<Products>) => {
        createProduct({ body: data }, {
            onSuccess: () => {
                form.reset();
                navigate(-1);
            }
        })
    };

    return (
        <>
            <ProductsForm
                methods={form}
                onSubmit={onSubmit}
                isPending={isPending}
            />
        </>
    )
}

export default CreateProducts;