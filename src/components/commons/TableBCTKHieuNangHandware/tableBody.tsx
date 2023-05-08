import { OHLCSeriesDataItem } from "@amcharts/amcharts4/charts";
import { LinearProgress, TableBody, TableRow } from "@material-ui/core";
import { Cell } from "components/commons/table/tableCommons";
import { NONAME } from "dns";
import React from "react";
import { Column, Row, TableBodyPropGetter, TableBodyProps } from "react-table";

export interface TableBodyIProps<D extends object> {
    columns: Array<Column<D>>;
    rows: Array<Row<D>>;
    getTableBodyProps: (propGetter?: TableBodyPropGetter<D>) => TableBodyProps;
    prepareRow: (row: Row<D>) => void;
    loading: boolean;
    counterSTT: () => number;
    data?: Array<D>;
}

const CustomTableBody = <D extends object>({
    rows,
    columns,
    getTableBodyProps,
    prepareRow,
    loading,
    counterSTT,
    data,
}: TableBodyIProps<D>) => {
    return (
        <TableBody {...getTableBodyProps()}>
            {!loading &&
                rows.map((row, i) => {
                    let dataRow: any = row.original;
                    let style: React.CSSProperties = dataRow["style"]
                        ? (dataRow["style"] as React.CSSProperties)
                        : ({} as React.CSSProperties);
                    prepareRow(row);
                    return (
                      <TableRow style={style} {...row.getRowProps()}>
                        <Cell
                          scope="row"
                          align="center"
                        >
                          {i + 1 + counterSTT()}
                        </Cell>
                        {row.cells.map((cell, index) => {
                          return (
                            <Cell
                              align="left"
                              scope="row"
                              {...cell.getCellProps()}
                              style={{
                                ...style,
                                fontSize: Number(style.fontSize ? style.fontSize : 14)
                              }}
                            >
                              {cell.render("Cell")}
                            </Cell>
                          );
                        })}
                      </TableRow>
                    );
                })}
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
    );
};

export default CustomTableBody;
