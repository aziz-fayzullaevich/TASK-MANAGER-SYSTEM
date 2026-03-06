import { Center, Loader, ScrollArea, Stack, Table } from "@mantine/core";
import type { PaginationProps } from "../configs/types/pagination-types";
import type { Column } from "../configs/types/table-types";
import type { ReactNode } from "react";
import { CustomPagination } from "./custom-pagination";

type TableProps<T> = {
    data: T[] | undefined | null;
    column: Column<T>[];
    loading: boolean;
    pagination: PaginationProps;
};

export function CustomTable<T>({
    data,
    column,
    loading,
    pagination
}: TableProps<T>) {

    if (loading) return (
        <Center h="70vh">
            <Stack align="center">
                <Loader color="orange" size="xl" type="bars" />
            </Stack>
        </Center>
    );

    return (
        <Stack>
            <ScrollArea>
                <Table striped highlightOnHover verticalSpacing={"sm"}>

                    <Table.Thead>
                        <Table.Tr>
                            {column.map((col, i) => (
                                <Table.Th key={i}>{col.header}</Table.Th>
                            ))}
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>
                        {data?.map((item, i) => (
                            <Table.Tr key={i}>
                                {column.map((col, i) => (
                                    <Table.Td key={i}>
                                        {
                                            typeof col.accessor === 'function' ? col.accessor(item) : (item[col.accessor] as ReactNode)
                                        }
                                    </Table.Td>
                                ))}
                            </Table.Tr>
                        ))}
                    </Table.Tbody>

                </Table>
            </ScrollArea>

            {pagination && (
                <CustomPagination
                    page={pagination.page}
                    pageSize={pagination.pageSize}
                    total={pagination.total}
                    onPageChange={pagination.onPageChange}
                    onPageSizeChange={pagination.onPageSizeChange}
                    pageSizeOptions={pagination.pageSizeOptions}
                />
            )}
        </Stack>
    )
};