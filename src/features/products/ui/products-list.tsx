import { ActionIcon, Badge, Button, Flex, Image, Rating, Stack, Text, Title } from "@mantine/core";
import { CustomTable } from "../../../shared/ui/custom-table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productsQueries } from "../queries/products-queries";
import type { Column } from "../../../shared/configs/types/table-types";
import type { Products } from "../types/products-types";
import { AddSquare, Edit, TrushSquare } from "iconsax-reactjs";
import { modals } from "@mantine/modals";
import { ROUTES } from "../../../shared/constants/routes";

export const ProductsList = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const navigate = useNavigate();

    const { data, isLoading } = productsQueries.useFetchProducts({ page, pageSize });
    const { mutate: deleteProduct } = productsQueries.useDeleteProduct();

    const handleDelete = (id: number) => modals.openConfirmModal({
        title: 'Удаление товара',
        children: (
            <Text size="sm" >
                Вы действительно хотите удалить товар?
            </Text>
        ),
        labels: { confirm: 'Удалить', cancel: 'Назад' },
        confirmProps: { color: 'red' },
        onConfirm: () => deleteProduct({ id })
    });

    const columns: Column<Products>[] = [
        {
            header: 'ID',
            accessor: 'id'
        },
        {
            header: 'Название',
            accessor: 'title'
        },
        {
            header: 'Описание',
            accessor: 'description'
        },
        {
            header: 'Изображение',
            accessor: item => (
                <Image
                    src={item.images[1]}
                    alt={item.title}
                    w={'100px'}
                    h={'100px'}
                />
            )
        },
        {
            header: 'Бренд',
            accessor: 'brand'
        },
        {
            header: 'Категория',
            accessor: item => (
                <Badge>{item.category}</Badge>
            )
        },
        {
            header: 'Цена',
            accessor: item => (
                <Title
                    order={6}
                    c={'orange'}>
                    {item.price ? item.price.toFixed(2) : null}$
                </Title>
            )
        },
        {
            header: 'Рейтинг',
            accessor: item => (
                <Rating
                    value={Number(item.rating)}
                    size={"xs"}
                    count={Number(item.rating)}
                    readOnly
                />
            )
        },
        {
            header: '',
            accessor: item => (
                <Flex align={'center'} gap={"md"}>
                    <ActionIcon
                        onClick={() => navigate(`/update-product/${item.id}`)}>
                        <Edit />
                    </ActionIcon>
                    <ActionIcon bg={'red'} onClick={() => handleDelete(item.id)}>
                        <TrushSquare />
                    </ActionIcon>
                </Flex>
            )
        }
    ];

    return (
        <div className="container">
            <Stack>
                <Flex align={'center'} justify={'space-between'}>
                    <Title order={3} c={'orange'}>Продукты</Title>
                    <Button
                        leftSection={<AddSquare />}
                        onClick={() => navigate(`/${ROUTES.CREATE_PRODUCT}`)}>Создать</Button>
                </Flex>
                <CustomTable
                    column={columns}
                    data={data?.products || []}
                    loading={isLoading}
                    pagination={{
                        page: page,
                        pageSize: pageSize,
                        total: data?.total || 0,
                        onPageChange: (newPage) => setPage(newPage),
                        onPageSizeChange: (size) => {
                            setPageSize(size);
                            setPage(1);
                        }
                    }}
                />
            </Stack>
        </div>
    )
};