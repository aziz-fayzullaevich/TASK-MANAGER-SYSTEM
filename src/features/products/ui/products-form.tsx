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
import { categoryKeys } from "../../../shared/constants/category-keys";
import { brandOptions } from "../../../shared/constants/brand-options";
import type { Products } from "../types/products-types";
import { ArrowLeft2, DirectboxSend } from "iconsax-reactjs";
import { useTranslation } from "react-i18next";

export type FormProps<T extends FieldValues> = {
    methods: UseFormReturn<T>;
    onSubmit: (data: T) => void;
    isPending: boolean;
};

export const ProductsForm = ({ methods, onSubmit, isPending }: FormProps<Partial<Products>>) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const theme = useMantineTheme();
    const { register, formState: { errors }, handleSubmit, control } = methods;

    const categoryOptions = categoryKeys.map((key) => ({
        label: t(`category.${key}`),
        value: key
    }));

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
                                <Title order={2} c={theme.colors.orange[5]}>{t('form.goods')}</Title>
                                <Text c="dimmed" fz="sm">{t('form.req-desc')}</Text>
                            </Box>
                            <DirectboxSend size="42" color={theme.colors.orange[6]} variant="Bulk" />
                        </Flex>

                        <Grid gutter="xl">
                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <TextInput
                                    label={t('table.title')}
                                    placeholder={t('form.placeholder-title')}
                                    withAsterisk
                                    size="md"
                                    {...register('title', { required: `${t('auth.required-filed')}` })}
                                    error={errors.title?.message}
                                />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <Controller
                                    name='price'
                                    control={control}
                                    rules={{ required: `${t('auth.required-filed')}` }}
                                    render={({ field }) => (
                                        <NumberInput
                                            label={t('table.price')}
                                            placeholder="0.00 $"
                                            withAsterisk
                                            size="md"
                                            prefix="$ "
                                            hideControls
                                            error={errors.price?.message}
                                            {...field}
                                        />
                                    )}
                                />
                            </Grid.Col>

                            <Grid.Col span={12}>
                                <Textarea
                                    label={t('table.desc')}
                                    placeholder={t('form.placeholder-desc')}
                                    withAsterisk
                                    size="md"
                                    minRows={3}
                                    {...register('description', { required: `${t('auth.required-filed')}` })}
                                    error={errors.description?.message}
                                />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <Controller
                                    name="category"
                                    control={control}
                                    rules={{ required: `${t('auth.required-filed')}` }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label={t('table.category')}
                                            data={categoryOptions}
                                            placeholder={t('form.choose-category')}
                                            withAsterisk
                                            clearable
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
                                    rules={{ required: `${t('auth.required-filed')}` }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label={t('table.brand')}
                                            data={brandOptions}
                                            placeholder={t('form.choose-brand')}
                                            withAsterisk
                                            clearable
                                            size="md"
                                            searchable
                                            error={errors.brand?.message}
                                        />
                                    )}
                                />
                            </Grid.Col>

                            <Grid.Col span={12} mt="xl">
                                <Flex justify="space-between" align="center">
                                    <Button
                                        variant="subtle"
                                        color="gray"
                                        size="md"
                                        leftSection={<ArrowLeft2 size="20" />}
                                        onClick={() => navigate(ROUTES.PRODUCTS)}
                                    >
                                        {t('form.back-to-lists')}
                                    </Button>

                                    <Group gap="md">
                                        <Button
                                            variant="outline"
                                            color="gray"
                                            size="md"
                                            onClick={() => methods.reset()}
                                        >
                                            {t('form.clear')}
                                        </Button>
                                        <Button
                                            type="submit"
                                            loading={isPending}
                                            size="md"
                                            color="orange.6"
                                            px={40}
                                        >
                                            {t('form.save')}
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