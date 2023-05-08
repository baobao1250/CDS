import { TableHead, TableRow } from "@material-ui/core";
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
            <TableRow >
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    width="3%"
                    rowSpan = {2}
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                    STT
                </Cell>
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    rowSpan = {2}
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                    Hệ Thống
                </Cell>
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    rowSpan = {2}
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                    Server
                </Cell>
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    colSpan = {3}
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                    
                    CPU  
                </Cell>
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    colSpan = {3}
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                    
                    Memory  
                </Cell>
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    colSpan = {2}
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                    
                    Disk  
                </Cell>
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    colSpan = {3}
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                    
                    Network (Gửi)  
                </Cell>
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    colSpan = {3}
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                    
                    Network (Nhận)  
                </Cell>
            </TableRow>
            <TableRow >
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                    Nhỏ nhất
                </Cell>
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                   Trung bình
                </Cell>
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                    Lớn nhất
                </Cell>   
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                    Nhỏ nhất
                </Cell>
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                   Trung bình
                </Cell>
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                    Lớn nhất
                </Cell>   
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                   Đã sử dụng
                </Cell>
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                   Còn trống
                </Cell>  
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                    Nhỏ nhất
                </Cell>
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                   Trung bình
                </Cell>
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                    Lớn nhất
                </Cell>   
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                    Nhỏ nhất
                </Cell>
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                   Trung bình
                </Cell>
                <Cell
                    component="th"
                    scope="row"
                    align="center"
                    style={{ border: "1px solid #aaaaaaa5", backgroundColor: "#d9ebf0" }}
                >
                    Lớn nhất
                </Cell>   
            </TableRow>
        </TableHead >
    );
};

export default CustomTableHeader;
