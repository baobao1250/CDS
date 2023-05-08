import {
    Button,
    InputBase,
    LinearProgress,
    Table,
    TableBody,
    TableContainer,
    TableFooter,
    TablePagination,
    withStyles,
} from "@material-ui/core";
import { TablePaginationActionsProps } from "@material-ui/core/TablePagination/TablePaginationActions";
import { Pagination } from "@material-ui/lab";
import * as React from "react";
import { Cell, Row as TableRow, RowSelect } from "../table/tableCommons";
import CustomCellTableCustom from "./customCellTableCustom";
import { Action, Pageable, TypeCell } from "./customTableInterface";
import TableHeader from "./tableHeader";
export interface ColumnCustomTable<T> {
    width?: number | string;
    align?: "inherit" | "left" | "center" | "right" | "justify";
    field?: keyof T;
    fieldChild?: String;
    title?: string;
    type?: TypeCell;
    actions?: Action<T>[];
    rowSpan?: number;
    colSpan?: number;
    enableSort?: boolean;
}

export interface CustomTableProps<T> {
    columns: ColumnCustomTable<T>[];
    rows: T[];
    tableHeader?: ColumnCustomTable<T>[][] | null;
    reduceSumField?: Number[];
    colReduce?: number;
    // Option End Table Show Button
    onAdd?: () => void;
    onSelectedRow?: (data: T) => void;
    onSort?: (field?: keyof T, orderBy?: "ASC" | "DESC") => void;

    pageParams?: Pageable;
    onChangePage?: (value: number) => void;
    onChangeRowsPerPage?: (rowsPerPage: number) => void;
}

const StyledTablePagination = withStyles(
    {
        root: {
            borderBottom: 0,
            background: "#fff",
        },
        toolbar: {
            padding: "0",
            "& .MuiPagination-root": {
                order: "-1",
                marginRight: "10px",
            },
            "& .MuiTablePagination-caption:nth-last-child(2)": {
                flexGrow: 1,
                textAlign: "right",
            },
        },
        spacer: {
            flex: 0,
        },
    },
    { index: 1 }
)(TablePagination);

export const CustomTable = <T extends { [key: string]: any }>({
    columns,
    onChangePage,
    onChangeRowsPerPage,
    pageParams,
    rows,
    tableHeader,
    onAdd,
    reduceSumField,
    colReduce = 2,
    onSelectedRow,
    onSort,
}: CustomTableProps<T>) => {
    const [loading, setLoading] = React.useState<boolean>(true);

    const handleChangePage = (newPage: number) => {
        onChangePage !== undefined && onChangePage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChangeRowsPerPage !== undefined && onChangeRowsPerPage(parseInt(event.target.value));
    };

    React.useEffect(() => {
        if (pageParams) {
            if (rows.length === 0 && pageParams?.page !== 0) {
                handleChangePage(pageParams?.page - 1);
            }
        }
    }, [rows.length]);


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

    function counterSTT(): number {
        if (pageParams) {
            return pageParams.page * pageParams.rowsPerPage;
        }
        return 0;
    }

    return (
        <TableContainer>
            <Table aria-label="customized table">
                <TableHeader columns={columns} tableHeader={tableHeader} onSort={onSort} />
                <TableBody>
                    {!loading &&
                        rows &&
                        rows.map((item: T, i) =>
                            !onSelectedRow ? (
                                <TableRow key={i}>
                                    <Cell scope="row" align="center">
                                        {i + 1 + counterSTT()}
                                    </Cell>
                                    {columns.map(
                                        ({ field, type, actions, align, fieldChild, title }, j) =>
                                            (field || title) && (
                                                <CustomCellTableCustom
                                                    index={i}
                                                    key={j}
                                                    item={item}
                                                    field={field}
                                                    fieldChild={fieldChild}
                                                    type={type}
                                                    actions={actions}
                                                    align={align && align}
                                                />
                                            )
                                    )}
                                </TableRow>
                            ) : (
                                <RowSelect key={i} onClick={() => onSelectedRow(item)}>
                                    <Cell scope="row" align="center">
                                        {i + 1 + counterSTT()}
                                    </Cell>
                                    {columns.map(
                                        ({ field, type, actions, align, fieldChild, title }, j) =>
                                            (field || title) && (
                                                <CustomCellTableCustom
                                                    index={i}
                                                    key={j}
                                                    item={item}
                                                    field={field}
                                                    fieldChild={fieldChild}
                                                    type={type}
                                                    actions={actions}
                                                    align={align && align}
                                                />
                                            )
                                    )}
                                </RowSelect>
                            )
                        )}
                    {loading && (
                        <TableRow>
                            <Cell colSpan={columns.length + 2} style={{ padding: "8px", textAlign: "center" }}>
                                <LinearProgress />
                            </Cell>
                        </TableRow>
                    )}
                    {!loading && rows.length > 0 && reduceSumField && (
                        <Cell colSpan={colReduce} align="center" style={{ fontWeight: "bold" }}>
                            Tổng số
                        </Cell>
                    )}
                    {!loading &&
                        rows.length > 0 &&
                        reduceSumField &&
                        reduceSumField.map((value, index) => {
                            return (
                                <Cell key={index} align="center" style={{ fontWeight: "bold" }}>
                                    {value}
                                </Cell>
                            );
                        })}
                    {!loading && rows.length === 0 && (
                        <TableRow>
                            <Cell colSpan={columns.length + 2} style={{ padding: "8px", textAlign: "center" }}>
                                Không có dữ liệu
                            </Cell>
                        </TableRow>
                    )}
                </TableBody>
                {!loading && pageParams !== undefined && (
                    <TableFooter>
                        <TableRow>
                            <StyledTablePagination
                                labelRowsPerPage={"Số mẫu tin trên trang"}
                                labelDisplayedRows={({ from, to, count }) =>
                                    onAdd ? (
                                        <Button variant="contained" color="primary" disableElevation onClick={onAdd}>
                                            Thêm mới
                                        </Button>
                                    ) : (
                                        `Mẫu tin ${from} - ${to}/${count}`
                                    )
                                }
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                count={pageParams.total}
                                rowsPerPage={pageParams.rowsPerPage}
                                page={pageParams.page}
                                SelectProps={{
                                    input: <InputBase style={{ borderRadius: 4, marginInlineStart: 5 }} />,
                                    inputProps: { "aria-label": "Số mẫu tin trên trang" },
                                    native: true,
                                }}
                                onPageChange={(_e, newPage) => handleChangePage(newPage)}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                )}
            </Table>
        </TableContainer>
    );
};

export const TablePaginationActions = (props: TablePaginationActionsProps) => {
    const { onPageChange, page, count, rowsPerPage } = props;

    const handleOnChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        onPageChange(null, value - 1);
    };

    return (
        <Pagination
            count={Math.ceil(count / rowsPerPage)}
            defaultPage={page + 1}
            page={page + 1}
            variant="outlined"
            size="medium"
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
            disabled={Math.ceil(count / rowsPerPage) === 1}
            onChange={handleOnChangePage}
        />
    );
};
