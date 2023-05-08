import { Box, Button, InputBase, LinearProgress, Table, TableBody, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { TablePaginationActionsProps } from "@material-ui/core/TablePagination/TablePaginationActions";
import { Pagination } from "@material-ui/lab";
import React, { useEffect } from "react";
import { Cell, Row } from "../table/tableCommons";
import CustomCellTableCustom from "./customCellTableCustom";
import { ColumnCustomTable } from "./customTable";

export const StyledTablePagination = withStyles({
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
})(TablePagination);

interface CommonTablePropsI<T> {
    columns: ColumnCustomTable<T>[];
    onAdd?: () => void;
    rows: T[];
    tableHeader?: ColumnCustomTable<T>[][] | null;
}

export const CustomTablePaginate = <T extends { [key: string]: any }>(props: CommonTablePropsI<T>) => {
    const { columns, rows, onAdd, tableHeader } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [loading, setLoading] = React.useState<boolean>(true);

    useEffect(() => {
        if (page !== 0 && rows.length % rowsPerPage === 0) {
            setPage(page - 1);
        }
    }, [rows.length]);

    function handleChangePage(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
        return o[propertyName]; // o[propertyName] is of type T[K]
    }

    useEffect(() => {
        if (page !== 0 && rowsPerPage === rows.length) {
            setPage(page - 1);
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

    return (
        <TableContainer>
            <Table aria-label="customized table">
                <TableHead>
                    {!tableHeader && (
                        <TableRow>
                            <Cell component="th" scope="row" align="center" width="5%" style={{ border: "1px solid #d7d7d7" }}>
                                STT
                            </Cell>
                            {columns.map(
                                (col, i) =>
                                    (col.title || col.actions) && (
                                        <Cell
                                            key={i}
                                            component="th"
                                            scope="row"
                                            align={col.align ? col.align : "center"}
                                            width={col.width}
                                            style={{ border: "1px solid #d7d7d7" }}
                                        >
                                            {col.title}
                                        </Cell>
                                    )
                            )}
                        </TableRow>
                    )}
                    {tableHeader &&
                        tableHeader.map((header) => (
                            <TableRow>
                                {header.map((col, i) => (
                                    <Cell
                                        component="th"
                                        scope="row"
                                        align={col.align ? col.align : "center"}
                                        width={col.width}
                                        colSpan={col.colSpan}
                                        rowSpan={col.rowSpan}
                                    >
                                        {col.title}
                                    </Cell>
                                ))}
                            </TableRow>
                        ))}
                </TableHead>
                <TableBody>
                    {!loading &&
                        (rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map(
                            (item: T, i) =>
                                !item.isDeleted && (
                                    <Row key={i}>
                                        <Cell scope="row" align="center">
                                            {i + 1 + page * rowsPerPage - rows.filter((item) => item.isDeleted === true).length}
                                        </Cell>
                                        {columns.map(({ field, type, actions, align, fieldChild }, j) => {
                                            return (
                                                <>
                                                    {(field || actions) && (
                                                        <CustomCellTableCustom
                                                            index={i}
                                                            item={item}
                                                            field={field}
                                                            fieldChild={fieldChild}
                                                            type={type}
                                                            actions={actions}
                                                            align={align && align}
                                                        />
                                                    )}
                                                </>
                                            );
                                        })}
                                    </Row>
                                )
                        )}
                    {loading && (
                        <TableRow>
                            <Cell colSpan={columns.length + 2} style={{ padding: "8px", textAlign: "center" }}>
                                <LinearProgress />
                            </Cell>
                        </TableRow>
                    )}
                    {((!loading && rows.length === 0) || (!loading && rows.every((item) => item.isDeleted === true))) && (
                        <TableRow>
                            <Cell colSpan={columns.length + 2}>
                                <Box textAlign="center" padding={1}>
                                    Không có dữ liệu
                                </Box>
                            </Cell>
                        </TableRow>
                    )}
                </TableBody>
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
                            rowsPerPageOptions={[5, 10, 25]}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                input: <InputBase fullWidth={false} />,
                                inputProps: { "aria-label": "Số mẫu tin trên trang" },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export function TablePaginationActions(props: TablePaginationActionsProps) {
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleOnChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        onPageChange(null, value - 1);
    };

    return (
        <Pagination
            count={Math.ceil(count / rowsPerPage)}
            defaultPage={page + 1}
            page={page + 1}
            siblingCount={1}
            disabled={Math.ceil(count / rowsPerPage) === 1}
            variant="outlined"
            size="medium"
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
            onChange={handleOnChangePage}
        />
    );
}
