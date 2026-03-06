import { ActionIcon, Badge, Button, Flex, Image, Rating, Stack, Text, Title } from "@mantine/core";
import { CustomTable } from "../../../shared/ui/custom-table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productsQueries } from "../queries/products-queries";
import type { Column } from "../../../shared/configs/types/table-types";
import type { Products } from "../types/products-types";
import { AddSquare, Edit, MinusSquare, TrushSquare } from "iconsax-reactjs";
import { modals } from "@mantine/modals";

export const ProductsList = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const navigate = useNavigate();

    const { data, isLoading } = productsQueries.useFetchProducts({ page, pageSize });

    const handleDelete = () => modals.openConfirmModal({
        title: 'Удаление товара',
        children: (
            <Text size="sm" >
                Вы действительно хотите удалить товар?
            </Text>
        ),
        labels: { confirm: 'Удалить', cancel: 'Назад' },
        confirmProps: { color: 'red' }
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
                    {item.price.toFixed()}$
                </Title>
            )
        },
        {
            header: 'Рейтинг',
            accessor: item => (
                <Rating
                    value={item.rating}
                    size={"xs"}
                    count={item.rating}
                    readOnly
                />
            )
        },
        {
            header: '',
            accessor: item => (
                <Flex align={'center'} gap={"md"}>
                    <ActionIcon>
                        <Edit />
                    </ActionIcon>
                    <ActionIcon bg={'red'} onClick={handleDelete}>
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
                    <Button leftSection={<AddSquare />}>Создать</Button>
                </Flex>
                <CustomTable
                    column={columns}
                    data={data?.products}
                    loading={isLoading}
                    pagination={
                        data?.products && {
                            page,
                            pageSize,
                            total: data.total,
                            onPageChange: setPage,
                            onPageSizeChange: (size) => {
                                setPageSize(size);
                                setPage(1);
                            }
                        }
                    }
                />
            </Stack>
        </div>
    )
};