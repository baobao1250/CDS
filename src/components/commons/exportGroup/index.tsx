import { makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import { MSExcelIcon, MSWordIcon, PDFIcon } from "../icons/icons";

const useStyles = makeStyles({
    root: {
        borderRadius: "15%",
        padding: "6px",
        "&:hover": {
            backgroundColor: "#ccc",
            borderRadius: "15%",
        },
    },
});

export interface ExportGroupPropsI {
    onClickWordButton?: () => void;
    onClickExcelButton?: () => void;
    onClickPDFButton?: () => void;
    onExportFile?: (downloadType: "MSWORD" | "EXCEL" | "PDF") => void;
}

export const ExportGroup = (props: ExportGroupPropsI) => {
    const classes = useStyles();
    const { onClickWordButton, onClickExcelButton, onClickPDFButton, onExportFile } = props;

    return (
        <>
            <IconButton classes={classes} onClick={() => onExportFile && onExportFile("MSWORD")} disableRipple aria-label="export-ms-word">
                <MSWordIcon color="primary" />
            </IconButton>
            <IconButton classes={classes} onClick={() => onExportFile && onExportFile("EXCEL")} disableRipple aria-label="export-excel">
                <MSExcelIcon style={{ color: green[500] }} />
            </IconButton>
            <IconButton classes={classes} onClick={() => onExportFile && onExportFile("PDF")} disableRipple aria-label="export-pdf">
                <PDFIcon color="secondary" />
            </IconButton>
        </>
    );
};
