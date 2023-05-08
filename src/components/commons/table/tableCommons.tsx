import { green, grey, red } from "@material-ui/core/colors";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";
import React from "react";
export const Cell = withStyles(
    (theme: Theme) =>
        createStyles({
            head: {
                backgroundColor: "#aaaaaaa5",
                border: "1px solid #fff",
                // color: "#030303",
                fontWeight: "bold",
                lineHeight: "1rem",
                padding: "8px 5px",
            },
            body: {
                fontSize: 14,
                border: " 1px solid #d7d7d7",
                padding: "2px 5px",
                // color: "#555555",
                wordBreak: "break-word",
            },
        }),
    { index: 1 }
)(TableCell);

export const Row = withStyles(
    (theme: Theme) =>
        createStyles({
            root: {
                "&:nth-of-type(odd)": {
                    backgroundColor: "#f7f7f7",
                },
                "&:nth-of-type(even)": {
                    backgroundColor: "#fff",
                },
            },
        }),
    { index: 1 }
)(TableRow);

export const RowSelect = withStyles(
    (theme: Theme) =>
        createStyles({
            root: {
                "&:nth-of-type(odd)": {
                    backgroundColor: "#f7f7f7",
                },
                "&:nth-of-type(even)": {
                    backgroundColor: "#fff",
                },
                "&:hover": {
                    backgroundColor: "#aaaaaaa5",
                },
                cursor: "pointer",
            },
        }),
    { index: 1 }
)(TableRow);

export const CheckIconActive = () => {
    return <CheckIcon style={{ color: green[500] }} fontSize="small" />;
};

export const CheckIconDeActive = () => {
    return <CheckIcon style={{ color: grey[800] }} fontSize="small" />;
};

export const IconError = () => {
    return <CancelIcon style={{ color: red[800] }} fontSize="small" />;
};
