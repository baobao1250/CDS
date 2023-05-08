import { Table, TableContainer } from "@material-ui/core";
import { Pageable } from "components/commons/customTable/customTableInterface";
import React from "react";
import { Column, TableInstance } from "react-table";
import TableBody from "./tableBody";
import CustomTableFooter from "./tableFooter";
import TableHeader from "./tableHeader";

export interface CustomReactTableProps<D extends object> {
    columns: Array<Column<D>>;
    table: TableInstance<D>;
    data?: Array<D>;
    pageParams: Pageable;
    onChangePage: (value: number) => void;
    onChangeRowsPerPage: (rowsPerPage: number) => void;
    handleSort?: (name: string, sort: "ASC" | "DESC") => void;
}

const CustomReactTable = <D extends object>({
    table,
    columns,
    pageParams,
    onChangePage,
    onChangeRowsPerPage,
    handleSort,
    data,
}: CustomReactTableProps<D>) => {
    const [loading, setLoading] = React.useState<boolean>(true);

    const { rows, getTableBodyProps, headerGroups, getTableProps, prepareRow } = table;

    function counterSTT(): number {
        if (pageParams) {
            return pageParams.page * pageParams.rowsPerPage;
        }
        return 0;
    }

    React.useEffect(() => {
        const timeSet = setInterval(() => {
            if (rows.length > 0) {
                setLoading(false);
                clearInterval(timeSet);
            } else {
                setLoading(false);
                clearInterval(timeSet);
            }
        }, 1000);
        return () => {
            clearInterval(timeSet);
        };
    }, [rows]);

    return (
        <TableContainer>
            <Table aria-label="customized table" {...getTableProps()}>
                <TableHeader headerGroups={headerGroups} handleSort={handleSort} />
                <TableBody
                    counterSTT={counterSTT}
                    columns={columns}
                    rows={rows}
                    prepareRow={prepareRow}
                    getTableBodyProps={getTableBodyProps}
                    loading={loading}
                    data={data}
                />
                <CustomTableFooter
                    pageParams={pageParams}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    loading={loading}
                />
            </Table>
        </TableContainer>
    );
};

export default CustomReactTable;
