import {
    Button,
    Flex,
    Grid,
    NumberInput,
    Paper,
    Select,
    TextInput,
    Textarea,
    Title,
    Box,
    useMantineTheme,
    Group,
    Text
} from "@mantine/core";
import { Controller, type FieldValues, type UseFormReturn } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routes";
import { categoryOptions } from "../../../shared/constants/category-options";
import { brandOptions } from "../../../shared/constants/brandOptions";
import type { Products } from "../types/products-types";
import { ArrowLeft2, DirectboxSend } from "iconsax-reactjs";

export type FormProps<T extends FieldValues> = {
    methods: UseFormReturn<T>;
    onSubmit: (data: T) => void;
    isPending: boolean;
};

export const ProductsForm = ({ methods, onSubmit, isPending }: FormProps<Partial<Products>>) => {
    const navigate = useNavigate();
    const theme = useMantineTheme();
    const { register, formState: { errors }, handleSubmit, control } = methods;

    return (
        <div className="container">
            <Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Paper
                        withBorder
                        shadow="xl"
                        p={20}
                        radius="lg"
                        mx="auto"
                        style={{
                            backgroundColor: 'transparent',
                            backdropFilter: 'blur(8px)',
                        }}
                    >
                        <Flex justify="space-between" align="center" mb="lg">
                            <Box>
                                <Title order={2} c={theme.colors.orange[5]}>Товар</Title>
                                <Text c="dimmed" fz="sm">Заполните данные для создания или обновления товара</Text>
                            </Box>
                            <DirectboxSend size="42" color={theme.colors.orange[6]} variant="Bulk" />
                        </Flex>

                        <Grid gutter="xl">
                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <TextInput
                                    label="Название"
                                    placeholder="Например: iPhone 15 Pro"
                                    withAsterisk
                                    size="md"
                                    {...register('title', { required: 'Обязательное поле!' })}
                                    error={errors.title?.message}
                                />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <Controller
                                    name="price"
                                    control={control}
                                    rules={{ required: 'Обязательное поле!' }}
                                    render={({ field }) => (
                                        <NumberInput
                                            {...field}
                                            label="Цена ($)"
                                            placeholder="0.00"
                                            withAsterisk
                                            size="md"
                                            prefix="$ "
                                            hideControls
                                            error={errors.price?.message}
                                        />
                                    )}
                                />
                            </Grid.Col>

                            <Grid.Col span={12}>
                                <Textarea
                                    label="Описание"
                                    placeholder="Детальное описание технических характеристик..."
                                    withAsterisk
                                    size="md"
                                    minRows={3}
                                    {...register('description', { required: 'Обязательное поле!' })}
                                    error={errors.description?.message}
                                />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <Controller
                                    name="category"
                                    control={control}
                                    rules={{ required: 'Обязательное поле!' }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Категория"
                                            data={categoryOptions}
                                            placeholder="Выберите категорию"
                                            withAsterisk
                                            size="md"
                                            searchable
                                            error={errors.category?.message}
                                        />
                                    )}
                                />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <Controller
                                    name="brand"
                                    control={control}
                                    rules={{ required: 'Обязательное поле!' }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Бренд"
                                            data={brandOptions}
                                            placeholder="Выберите бренд"
                                            withAsterisk
                                            size="md"
                                            searchable
                                            error={errors.brand?.message}
                                        />
                                    )}
                                />
                            </Grid.Col>

                            {/* Кнопки действий */}
                            <Grid.Col span={12} mt="xl">
                                <Flex justify="space-between" align="center">
                                    <Button
                                        variant="subtle"
                                        color="gray"
                                        size="md"
                                        leftSection={<ArrowLeft2 size="20" />}
                                        onClick={() => navigate(ROUTES.PRODUCTS)}
                                    >
                                        Вернуться к списку
                                    </Button>

                                    <Group gap="md">
                                        <Button
                                            variant="outline"
                                            color="gray"
                                            size="md"
                                            onClick={() => methods.reset()}
                                        >
                                            Очистить
                                        </Button>
                                        <Button
                                            type="submit"
                                            loading={isPending}
                                            size="md"
                                            color="orange.6"
                                            px={40}
                                        >
                                            Сохранить товар
                                        </Button>
                                    </Group>
                                </Flex>
                            </Grid.Col>
                        </Grid>
                    </Paper>
                </form>
            </Box>
        </div>
    )
};