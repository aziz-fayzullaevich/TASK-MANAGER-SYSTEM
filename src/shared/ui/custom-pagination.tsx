import { Group, Pagination, Select, Text } from "@mantine/core";
import type { PaginationProps } from "../configs/types/pagination-types";

export const CustomPagination = ({
    page,
    total,
    pageSize,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [5, 10, 15, 20]
}: PaginationProps) => {
    const totalPage = Math.ceil(total / pageSize);

    return (
        <Group justify="space-between" mt={"md"}>
            <Group>
                <Text>Строк на странице:</Text>
                <Select
                    w={80}
                    value={String(pageSize)}
                    onChange={value => onPageSizeChange(Number(value))}
                    data={pageSizeOptions.map(n => ({
                        value: String(n),
                        label: String(n)
                    }))}
                />
            </Group>
            <Pagination
                color="orange"
                radius={"xl"}
                value={page}
                onChange={onPageChange}
                total={totalPage}
            />
        </Group>
    )
};