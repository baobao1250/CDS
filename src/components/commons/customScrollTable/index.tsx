import { LinearProgress, Table, TableBody, TableContainer, TableRow, Box, TableHead } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CustomCellTableCustom from "../customTable/customCellTableCustom";
import { ColumnCustomTable } from "../customTable/customTable";
import TableHeader from "../customTable/tableHeader";
import { Cell } from "../table/tableCommons";

export interface CustomScrollIProps<T> {
    columns: ColumnCustomTable<T>[];
    rows: T[];
    tableHeader?: ColumnCustomTable<T>[][] | null;
    height?: number;
}

const CustomScrollTable = <T extends { [key: string]: any }>({ columns, rows, tableHeader, height }: CustomScrollIProps<T>) => {
    const [loading, setLoading] = React.useState<boolean>(true);
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
        <Box
            style={{
                height: height === undefined || height === null ? "300px" : `${height}px`,
                display: "block",
                overflow: "auto"
            }}
        >
            <Table stickyHeader aria-label="customized table" >
                <TableHead >
                    {!tableHeader && (
                        <TableRow>
                            <Cell component="th" scope="row" align="center" width="5%" style={{ border: "1px solid #d7d7d7", backgroundColor: "#d7d7d7" }}>
                                STT
                            </Cell>
                            {columns.map((col, i) => {
                                return (
                                    col.title && (
                                        <Cell key={i} component="th" scope="row" align={"center"} width={col.width} style={{ border: "1px solid #d7d7d7", backgroundColor: "#d7d7d7" }}>
                                            {col.title}
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
                                        style={{ border: "1px solid #d7d7d7", backgroundColor: "#d7d7d7" }}
                                    >
                                        {col.title}
                                    </Cell>
                                ))}
                            </TableRow>
                        ))}
                </TableHead>
                <TableBody>
                    {!loading &&
                        rows &&
                        rows.map((item: T, i) =>
                            <TableRow key={i}>
                                <Cell scope="row" align="center">
                                    {i + 1}
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
                        )}
                    {loading && (
                        <TableRow>
                            <Cell colSpan={columns.length + 2} style={{ padding: "8px", textAlign: "center" }}>
                                <LinearProgress />
                            </Cell>
                        </TableRow>
                    )}
                    {!loading && rows.length === 0 && (
                        <TableRow>
                            <Cell colSpan={columns.length + 2} style={{ padding: "8px", textAlign: "center" }}>
                                Không có dữ liệu
                            </Cell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Box>
    )
}
export default CustomScrollTable;