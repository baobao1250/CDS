import { TableRow, IconButton, TableHead } from "@material-ui/core";
import React from "react";
import { Cell } from "../table/tableCommons";
import { ColumnCustomTable } from "./customTable";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
export interface TableHeaderProps<T> {
    columns: ColumnCustomTable<T>[];
    tableHeader?: ColumnCustomTable<T>[][] | null;
    onSort?: (field?: keyof T, orderBy?: "ASC" | "DESC") => void;
}

export interface SortButtonProps<T> {
    col: ColumnCustomTable<T>;
    onSort?: (field?: keyof T, orderBy?: "ASC" | "DESC") => void;
}

const SortButton = <T extends { [key: string]: any }>({ col, onSort }: SortButtonProps<T>) => {
    const [orderBy, setOrderBy] = React.useState<String>("ASC");

    function handleSort(orderBy: "ASC" | "DESC", field: keyof T) {
        setOrderBy(orderBy);
        onSort && onSort(field, orderBy);
    }

    return (
        <>
            {onSort && col.enableSort && (
                <IconButton
                    onClick={() => handleSort(orderBy === "ASC" ? "DESC" : "ASC", `${col.field}`)}
                    style={{ padding: 0, position: "relative", bottom: 2, marginLeft: 10 }}
                >
                    {orderBy === "ASC" ? <ArrowUpwardIcon fontSize="small" color="primary" /> : <ArrowDownwardIcon fontSize="small" color="primary" />}
                </IconButton>
            )}
        </>
    );
};

const TableHeader = <T extends { [key: string]: any }>({ columns, tableHeader, onSort }: TableHeaderProps<T>) => {
    return (
        <TableHead>
            {!tableHeader && (
                <TableRow>
                    <Cell component="th" scope="row" align="center" width="5%" style={{border: "1px solid #d7d7d7"}}>
                        STT
                    </Cell>
                    {columns.map((col, i) => {
                        return (
                            col.title && (
                                <Cell key={i} component="th" scope="row" align={"center"} width={col.width} style={{border: "1px solid #d7d7d7"}}>
                                    {col.title}
                                    <SortButton onSort={onSort} col={col} />
                                </Cell>
                            )
                        );
                    })}
                </TableRow>
            )}
            {tableHeader &&
                tableHeader.map((header, index) => (
                    <TableRow key={index}>
                        {header.map((col, i) => (
                            <Cell
                                key={i}
                                component="th"
                                scope="row"
                                align={col.align ? col.align : "center"}
                                width={col.width}
                                colSpan={col.colSpan}
                                rowSpan={col.rowSpan}
                                style={{border: "1px solid #d7d7d7"}}
                            >
                                {col.title}
                            </Cell>
                        ))}
                    </TableRow>
                ))}
        </TableHead>
    );
};

export default TableHeader;
