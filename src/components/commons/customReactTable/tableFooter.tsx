import { Box, InputBase, MenuItem, Select } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Pageable } from "../customTable/customTableInterface";

export interface CustomTableFooterProps {
    pageParams: Pageable;
    loading: boolean;
    onChangePage: (value: number) => void;
    onChangeRowsPerPage: (rowsPerPage: number) => void;
}

const useStylesPagination = makeStyles((theme) => ({
    root: {
        "& .Mui-selected": {
            backgroundColor: "#272F3B",
            color: "#FFF",
        },
        "& .MuiPaginationItem-firstLast": {
            backgroundColor: "#F0F0F0",
            color: "#000",
            border: "none",
        },
        "& ul > li:not(:first-child):not(:last-child) > button:not(.Mui-selected)": {
            backgroundColor: "#F0F0F0",
            color: "#000",
            border: "none",
        },
    },
}));

const CustomTableFooter: React.FC<CustomTableFooterProps> = ({ pageParams, onChangePage, onChangeRowsPerPage }) => {
    const classes = useStylesPagination();

    const total = Math.ceil(pageParams.total / pageParams.rowsPerPage);
    const count = !isNaN(total) ? total : 0;

    return (
        <Box paddingTop="10px" paddingBottom="10px" display="flex" alignItems="center" fontSize="14px" color="#555555" style={{display: 'flex', flex: 1}} >
            <Box flexGrow={1} display="flex" alignItems="center">
                <Select
                    input={
                        <InputBase
                            style={{
                                background: "#F0F0F0",
                                height: 36,
                                width: 70,
                                borderRadius: 4,
                                padding: 0,
                                textAlign: "center",
                            }}
                        />
                    }
                    value={pageParams.rowsPerPage}
                    onChange={(event) => onChangeRowsPerPage(Number(event.target.value))}
                >
                    <MenuItem style={{ width: 70, padding: "5px 8px" }} value={5}>
                        <Box component="span" fontFamily="Montserrat" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                            5
                        </Box>
                    </MenuItem>
                    <MenuItem style={{ width: 70, padding: "5px 8px" }} value={10}>
                        <Box component="span" fontFamily="Montserrat" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                            10
                        </Box>
                    </MenuItem>
                    <MenuItem style={{ width: 70, padding: "5px 8px" }} value={25}>
                        <Box component="span" fontFamily="Montserrat" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                            25
                        </Box>
                    </MenuItem>
                </Select>
                <Box component="span" paddingX="10px" fontFamily="Montserrat" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                    Đang hiển thị từ {pageParams.total === 0 ? 0 : Math.ceil(pageParams.page * pageParams.rowsPerPage + 1)} đến{" "}
                    {pageParams.total < (pageParams.page + 1) * pageParams.rowsPerPage ? pageParams.total : (pageParams.page + 1) * pageParams.rowsPerPage} của{" "}
                    {pageParams.total} phần tử
                </Box>
            </Box>

            <Pagination
                count={count}
                defaultPage={pageParams.page + 1}
                page={pageParams.page + 1}
                siblingCount={1}
                disabled={total === 1}
                variant="outlined"
                size="medium"
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
                onChange={(event, page) => onChangePage(page - 1)}
                classes={classes}
            />
        </Box>
    );
};

export default CustomTableFooter;
