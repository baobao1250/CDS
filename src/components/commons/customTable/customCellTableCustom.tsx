import { Box, Button, Checkbox, DialogActions, IconButton, Switch, TextField } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { Label } from "@material-ui/icons";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ViewListIcon from "@material-ui/icons/ViewList";
import { LIST_THANHCONGCU } from "constants/constants";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import StringUtil from "../../../utils/stringUtils";
import { Cell } from "../table/tableCommons";
import CustomMenu from "./customMenuDrop";
import { Action, TypeCell } from "./customTableInterface";
import * as MUI from "@material-ui/core";
interface IPropsCell<T> {
    index?: number;
    item: T;
    field?: keyof T;
    fieldChild?: String;
    type?: TypeCell;
    actions?: Action<T>[];
    align?: "center" | "inherit" | "justify" | "left" | "right";
}

async function handleDownloadFile(file: any) {
    // await new AttachFileService().downloadFile(file).then((res) => {
    //     let blob = new Blob([res.data], { type: res.data.type });
    //     let url = window.URL.createObjectURL(blob);
    //     let link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", `${file.fileName}`);
    //     document.body.appendChild(link);
    //     link.click();
    //     link.remove();
    //     window.URL.revokeObjectURL(url);
    // });
}

const CustomCellTableCustom = <T extends { [key: string]: any }>({ item, field, fieldChild, type, actions, align = "center", index }: IPropsCell<T>) => {
    switch (type) {
        case TypeCell.LINK:
            return (
                <Cell scope="row" align={align}>
                    {field && item[field] && (
                        <Link
                            to={{
                                pathname: `${actions !== undefined && actions[0].title}`,
                                state: { item: item },
                            }}
                            style={{ textDecoration: "none", color: "#367fa9" }}
                            className="url-link"
                        >
                            {item[field]}
                        </Link>
                    )}
                </Cell>
            );
        case TypeCell.OBJECT_LINK:
            const itemLink: any = field && item[field];

            return (
                <Cell scope="row">
                    {field && item[field] && (
                        <Link
                            to={{
                                pathname: `${actions !== undefined && actions[0].title}`,
                                state: { item: item },
                            }}
                            style={{ textDecoration: "none", color: "#367fa9" }}
                            className="url-link"
                        >
                            {fieldChild && itemLink[`${fieldChild}`]}
                        </Link>
                    )}
                </Cell>
            );
        case TypeCell.BOOLEAN:
            return (
                <Cell scope="row" align={align}>
                    {field && item[field] && <CheckRoundedIcon style={{ color: green[500] }} />}
                </Cell>
            );
        case TypeCell.CURRENCY:
            return (
                <Cell scope="row" align={align}>
                    {field && StringUtil.formatMoney(`${item[field]}`)}
                </Cell>
            );
        case TypeCell.DATE:
            return (
                <Cell scope="row" align={align}>
                    {field && item[field] ? moment(item[field]).format("DD/MM/YYYY") : ""}
                </Cell>
            );
        case TypeCell.YEAR:
            return (
                <Cell scope="row" align={align}>
                    {field && item[field] && StringUtil.getyear(item[field])}
                </Cell>
            );
        case TypeCell.DATE_TO_DATE:
            const dateFrom = field && item[field] ? moment(item[field]).format("DD/MM/YYYY") : "";
            const dateTo = fieldChild && item[String(fieldChild)] ? moment(item[String(fieldChild)]).format("DD/MM/YYYY") : "";
            return (
                <Cell scope="row" align={align}>
                    {`${dateFrom}-${dateTo}`}
                </Cell>
            );
        case TypeCell.DATE_TIME:
            return (
                <Cell scope="row" align={align}>
                    {field ? moment(item[field]).format("DD/MM/YYYY hh:mm:ss") : ""}
                </Cell>
            );
        case TypeCell.FILE:
            return (
                <Cell scope="row" align={align}>
                    <Button color="primary" style={{ backgroundColor: "transparent" }} onClick={() => handleDownloadFile(item)}>
                        <AttachFileIcon fontSize="small" />
                    </Button>
                </Cell>
            );
        case TypeCell.ACTION:
            return (
                <Cell scope="row" align={align} width="5%">
                    <CustomMenu item={item} actions={actions} />
                </Cell>
            );
        case TypeCell.STATUS:
            const status = field && item[field];
            let color: string = "#92dbf0";
            if (status === "DANG_SOAN") 
            {
                if(item["active"] === true)
                {
                    color = "#fbd0a5";
                }else{
                    color = "#efc2ff";
                }
            }
            if (status === "CHUA_PHAN_HOI") color = "#ababab";
            if (status === "HUY_YEU_CAU") color = "#f09292";
             if (status === "DA_PHAN_HOI") color = "#c3edff";
            return (
                <Cell scope="row" align={align} width="5%">
                    <Box style={{ backgroundColor: color, borderRadius: "5px", color: "#000", fontSize: 12 }}>{fieldChild && item[`${fieldChild}`]}</Box>
                </Cell>
            );
        case TypeCell.ACTION_LINE:
            return (
                <Cell align={align}>
                    <Box display="flex" justifyContent="center">
                        {actions !== undefined &&
                            actions.map((action, i) => {
                                return (
                                    <IconButton
                                        color="primary"
                                        key={i}
                                        aria-label="edit"
                                        size="small"
                                        disabled={action.disabled && action.disabled(item)}
                                        onClick={() => {
                                            action.func && action.func(item, index && index);
                                        }}
                                        style={{
                                            padding: 5,
                                            borderRadius: 4,
                                            border: action.disabled && action.disabled(item) ? "1px solid grey" : "1px solid #367fa9",
                                            marginLeft: 4,
                                        }}
                                    >
                                        {action.icon}
                                    </IconButton>
                                );
                            })}
                    </Box>
                </Cell>
            );
        case TypeCell.ACTION_LINE_STATUS:
            return (
                <Cell align={align}>
                    <Box display="flex" justifyContent="center">
                        {actions !== undefined &&
                            actions.map((action, i) => {
                                return (
                                    <IconButton
                                        color="primary"
                                        key={i}
                                        aria-label="edit"
                                        size="small"
                                        disabled={action.disabled && action.disabled(item)}
                                        onClick={() => {
                                            action.func && action.func(item, index && index);
                                        }}
                                        style={{
                                            padding: 5,
                                            borderRadius: 4,
                                            border: action.disabled && action.disabled(item) ? "1px solid grey" : "1px solid #367fa9",
                                            marginLeft: 4,
                                        }}
                                    >
                                        {action.icon(item)}
                                    </IconButton>
                                );
                            })}
                    </Box>
                </Cell>
            );
        case TypeCell.ACTION_BUTTON:
            return (
                <Cell scope="row" align={align} width="5%">
                    <IconButton color="default" aria-label="edit" size="small">
                        <ViewListIcon />
                    </IconButton>
                </Cell>
            );
        case TypeCell.OBJECT:
            const itemNew: any = field && item[field];
            return (
                <Cell scope="row" align={align}>
                    {fieldChild && itemNew[`${fieldChild}`]}
                </Cell>
            );
        case TypeCell.SWITCH:
            return (
                <Cell scope="row" align={align}>
                    <Switch
                        disabled={actions !== undefined && actions[0] && actions[0].disabled && actions[0].disabled(item)}
                        checked={field && item[`${field}`]}
                        onChange={() => {
                            actions !== undefined && actions[0] && actions[0].func && actions[0].func(item, index);
                        }}
                        color="primary"
                    />
                </Cell>
            );
        case TypeCell.CHECK_BOX:
            return (
                <Cell scope="row" align={align}>
                    <Checkbox
                        checked={field && item[`${field}`]}
                        onChange={() => {
                            actions !== undefined && actions[0] && actions[0].func && actions[0].func(item, index);
                        }}
                        color="primary"
                        style={{ padding: 0 }}
                    />
                </Cell>
            );
        case TypeCell.ACTION_POPUP:
            return (
                <Cell scope="row" align={align}>
                    {actions !== undefined && actions.map((action, i) => {
                        return (
                            <a style={{
                                borderRadius: 4,
                                color: "rgb(56 129 171)",
                                cursor: "pointer",
                            }}
                                onClick={() => { action.func && action.func(item, index && index); }}
                            >
                                {field !== undefined && item[field]}
                            </a>
                        )
                    })}

                </Cell>
            );
        case TypeCell.ICON:
            if(field){
                var icon = LIST_THANHCONGCU.find(x => x.ma == item[field])
            }
            return (
                <Cell scope="row" align={align}>
                    {icon && (
                        <MUI.MenuItem key={index} value={`${icon.ma}`} style={{justifyContent: "center"}}>
                            {icon.icon}
                        </MUI.MenuItem>
                    )}
                </Cell>
            );
         case TypeCell.TEXT_OVERFLOW:
            return (
                <Cell scope="row" align={align} style={{whiteSpace: "nowrap", maxWidth: 500, overflow: "hidden", textOverflow: "ellipsis"}}>
                    {field !== undefined && item[field]}
                </Cell>
            );
        default:
            return (
                <Cell scope="row" align={align}>
                    {field !== undefined && item[field]}
                </Cell>
            );
    }
};

export default CustomCellTableCustom;
function makeStyles(arg0: (theme: any) => any, arg1: { index: number }) {
    throw new Error("Function not implemented.");
}

function createStyles(arg0: { root: { height: string; "&:hover": { backgroundColor: string } } }) {
    throw new Error("Function not implemented.");
}
