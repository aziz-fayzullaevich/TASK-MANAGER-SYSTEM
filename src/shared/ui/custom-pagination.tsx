import { Group, Pagination, Select, Text } from "@mantine/core";
import type { PaginationProps } from "../configs/types/pagination-types";
import { useTranslation } from "react-i18next";

export const CustomPagination = ({
    page,
    total,
    pageSize,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [5, 10, 15, 20]
}: PaginationProps) => {
    const totalPage = Math.ceil(total / pageSize);
    const {t} = useTranslation();

    return (
        <Group justify="space-between" mt={"md"}>
            <Group>
                <Text>{t('table.line-on-page')}</Text>
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