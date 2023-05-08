import { InputBase, TableFooter, TableRow } from "@material-ui/core";
import { TablePaginationActions } from "components/commons/customTable/customTable";
import { Pageable } from "components/commons/customTable/customTableInterface";
import { StyledTablePagination } from "components/commons/customTable/customTablePaginate";
import React from "react";

export interface CustomTableFooterProps {
    pageParams: Pageable;
    loading: boolean;
    onChangePage: (value: number) => void;
    onChangeRowsPerPage: (rowsPerPage: number) => void;
}

const CustomTableFooter: React.FC<CustomTableFooterProps> = ({ pageParams, loading, onChangePage, onChangeRowsPerPage }) => {
    return (
        <>
            {!loading && (
                <TableFooter>
                    <TableRow>
                        <StyledTablePagination
                            labelRowsPerPage={"Số mẫu tin trên trang"}
                            labelDisplayedRows={({ from, to, count }) => `Mẫu tin ${from} - ${to}/${count}`}
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            count={pageParams.total}
                            rowsPerPage={pageParams.rowsPerPage}
                            page={pageParams.page}
                            SelectProps={{
                                input: <InputBase fullWidth={false} style={{ paddingLeft: 10 }} />,
                                inputProps: { "aria-label": "Số mẫu tin trên trang" },
                                native: true,
                            }}
                            onPageChange={(_e, page) => onChangePage(page)}
                            onRowsPerPageChange={(e) => onChangeRowsPerPage(Number(e.target.value))}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            )}
        </>
    );
};

export default CustomTableFooter;
