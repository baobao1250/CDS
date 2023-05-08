import { Box, TableHead, TableRow } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDownward";
import ArrowDropUpIcon from "@material-ui/icons/ArrowUpward";
import { Cell } from "components/commons/table/tableCommons";
import React from "react";
import { HeaderGroup } from "react-table";
export interface CustomTableHeaderProps<D extends object> {
    headerGroups: Array<HeaderGroup<D>>;
    enableSort?: boolean;
    handleSort?: (name: string, sort: "ASC" | "DESC") => void;
}

const CustomTableHeader = <D extends object>({ headerGroups, enableSort, handleSort }: CustomTableHeaderProps<D>) => {
    const [sort, setSort] = React.useState<"ASC" | "DESC">("ASC");

    return (
        <TableHead>
            {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()} style={{ background: "#FAFAFA", padding: 0 }}>
                    <Cell
                        component="th"
                        scope="row"
                        align="center"
                        width="3%"
                        // style={{ border: "1px solid #aaaaaaa5", backgroundColor: headerGroup.headers[0].color ? headerGroup.headers[0].color : "white" }}
                        style={{
                            border: "1px solid #F5F5F5",
                            padding: "4px 10px",
                            backgroundColor: headerGroup.headers[0].color ? headerGroup.headers[0].color : "#FAFAFA",
                        }}
                    >
                        <Box component="span" fontFamily="Montserrat" textAlign="center" style={{ fontWeight: 500, fontSize: 14 }}>
                            STT
                        </Box>
                    </Cell>
                    {headerGroup.headers.map((column) => {
                        return (
                            <Cell
                                component="th"
                                scope="row"
                                align="center"
                                width={`${column.maxWidth}%`}
                                style={{ border: "1px solid #F5F5F5", padding: "4px 10px", backgroundColor: column.color ? column.color : "#FAFAFA" }}
                                {...column.getHeaderProps(enableSort ? column.getSortByToggleProps() : undefined)}
                                // {...column.getHeaderProps(column.getSortByToggleProps())}
                                // style={{ border: "1px solid #aaaaaaa5", backgroundColor: column.color ? column.color : "white"  }}
                            >
                                <Box component="span" fontFamily="Montserrat" textAlign="center" style={{ fontWeight: 500, fontSize: 14 }}>
                                    {column.render("Header")}
                                </Box>
                                {column.sortType === "ASC" && sort === "ASC" ? (
                                    <ArrowDropUpIcon
                                        color="primary"
                                        style={{ fontSize: "19px", float: "right", cursor: "pointer" }}
                                        onClick={() => {
                                            setSort("DESC");
                                            handleSort && handleSort(column.id, sort);
                                        }}
                                    />
                                ) : null}
                                {column.sortType === "ASC" && sort === "DESC" ? (
                                    <ArrowDropDownIcon
                                        color="primary"
                                        style={{ fontSize: "19px", float: "right", cursor: "pointer" }}
                                        onClick={() => {
                                            setSort("ASC");
                                            handleSort && handleSort(column.id, sort);
                                        }}
                                    />
                                ) : null}
                                {column.sortType === "DESC" && sort === "ASC" ? (
                                    <ArrowDropUpIcon
                                        color="primary"
                                        style={{ fontSize: "19px", float: "right", cursor: "pointer" }}
                                        onClick={() => {
                                            setSort("DESC");
                                            handleSort && handleSort(column.id, sort);
                                        }}
                                    />
                                ) : null}
                                {column.sortType === "DESC" && sort === "DESC" ? (
                                    <ArrowDropDownIcon
                                        color="primary"
                                        style={{ fontSize: "19px", float: "right", cursor: "pointer" }}
                                        onClick={() => {
                                            setSort("ASC");
                                            handleSort && handleSort(column.id, sort);
                                        }}
                                    />
                                ) : null}
                            </Cell>
                        );
                    })}
                </TableRow>
            ))}
        </TableHead>
    );
};

export default CustomTableHeader;
