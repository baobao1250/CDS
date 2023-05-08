import { Box, Button, Theme, Tooltip, withStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import AttachmentIcon from "@material-ui/icons/Attachment";
import React from "react";
import { FileIcon, ImgIcon, MSExcelIcon, MSWordIcon, PDFIcon } from "../icons/icons";

const msword = ["doc", "docx"];
const xcel = ["xls", "xlsx"];
const images = ["jpg", "jpeg", "png", "gif", "ico"];

export interface AttachFileInteface {
    id: number;
    fileName: string;
    type: string;
    file?: Blob;
    isDeleted?: boolean;
}
const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: "#fff",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: theme.typography.pxToRem(12),
        border: "1px solid #dadde9",
    },
    arrow: {
        "&::before": {
            backgroundColor: "#dadde9",
        },
    },
}))(Tooltip);

export function AttachIcon({ fileName, fontSize }: { fileName: string; fontSize?: "small" | "inherit" | "default" | "large" | undefined }) {
    const ext = "" + fileName.split(".").pop()?.toLowerCase();
    if (msword.some((e) => e === ext)) {
        return <MSWordIcon fontSize={fontSize} color="primary" />;
    } else if (xcel.some((e) => e === ext)) {
        return <MSExcelIcon fontSize={fontSize} style={{ color: green[500] }} />;
    } else if (images.some((e) => e === ext)) {
        return <ImgIcon fontSize={fontSize} style={{ color: green[500] }} />;
    } else if (ext === "pdf") {
        return <PDFIcon fontSize={fontSize} color="secondary" />;
    }
    return <FileIcon fontSize={fontSize} color="action" />;
}

export interface AttachFileTooltipPropsI {
    attachFiles: AttachFileInteface[];
    onClickDownload?: (id: string | number, fileName: string) => void;
    attachIcon?: React.ReactNode;
    attachIconColor?: "default" | "primary" | "secondary" | "inherit" | undefined;
}

export const AttachFileTooltip = (props: AttachFileTooltipPropsI) => {
    const { attachFiles, attachIcon, attachIconColor, onClickDownload } = props;

    return (
        <>
            {attachFiles && (
                <HtmlTooltip
                    interactive
                    arrow
                    title={
                        <Box display="flex" flexDirection="column">
                            {attachFiles.map((item, i) => (
                                <Button
                                    key={i}
                                    fullWidth
                                    style={{ justifyContent: "flex-start" }}
                                    disableRipple
                                    disableFocusRipple
                                    startIcon={<AttachIcon fileName={item.fileName} />}
                                    onClick={() => {
                                        onClickDownload && onClickDownload(item.id, item.fileName);
                                    }}
                                >
                                    {item.fileName}
                                </Button>
                            ))}
                        </Box>
                    }
                >
                    <Button disableRipple size="small" color={attachIconColor} disableFocusRipple startIcon={attachIcon ? attachIcon : <AttachmentIcon />}>
                        ({attachFiles.length})
                    </Button>
                </HtmlTooltip>
            )}
        </>
    );
};
