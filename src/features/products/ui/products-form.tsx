import { Button, Flex, Grid, NumberInput, Paper, Select, TextInput } from "@mantine/core";
import { Controller, type FieldValues, type UseFormReturn } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routes";
import { categoryOptions } from "../../../shared/constants/category-options";
import { brandOptions } from "../../../shared/constants/brandOptions";
import type { Products } from "../types/products-types";
import { ArrowLeft2 } from "iconsax-reactjs";

export type FormProps<T extends FieldValues> = {
    methods: UseFormReturn<T>;
    onSubmit: (data: T) => void;
    isPending: boolean;
};

export const ProductsForm = ({ methods, onSubmit, isPending }: FormProps<Partial<Products>>) => {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = methods;

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Paper>
                    <Grid>
                        <Grid.Col span={6}>
                            <TextInput
                                label={'Название'}
                                placeholder="Название товара"
                                withAsterisk
                                {...register('title', { required: 'Обязательное поле!' })}
                                error={errors.title?.message}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label={'Описание'}
                                placeholder="Описание товара"
                                withAsterisk
                                {...register('description', { required: 'Обязательное поле!' })}
                                error={errors.description?.message}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Controller
                                name="price"
                                control={methods.control}
                                rules={{ required: 'Обязательное поле!' }}
                                render={({ field }) => (
                                    <NumberInput
                                        {...field}
                                        label="Цена"
                                        placeholder="Цена товара"
                                        withAsterisk
                                        error={errors.price?.message}
                                    />
                                )}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Controller
                                name="category"
                                control={methods.control}
                                rules={{ required: 'Обязательное поле!' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label="Категория"
                                        data={categoryOptions}
                                        placeholder="Выберите категорию"
                                        withAsterisk
                                        clearable
                                        error={errors.category?.message}
                                    />
                                )}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Controller
                                name="brand"
                                control={methods.control}
                                rules={{ required: 'Обязательное поле!' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label="Категория"
                                        data={brandOptions}
                                        placeholder="Выберите бренд"
                                        withAsterisk
                                        clearable
                                        error={errors.brand?.message}
                                    />
                                )}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Flex align={'center'} justify={'flex-end'} w={'100%'} mt={"lg"} gap={'lg'}>
                                <Button
                                    size="md"
                                    variant="outline"
                                    leftSection={
                                        <ArrowLeft2
                                            size="18"
                                            color="#FF8A65"
                                        />
                                    }
                                    onClick={() => navigate(ROUTES.PRODUCTS)}>Назад</Button>
                                <Button type="submit" loading={isPending} size="md">Сохранить</Button>
                            </Flex>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </form>
        </div>
    )
};