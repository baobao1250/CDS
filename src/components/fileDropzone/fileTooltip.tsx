import AttachmentIcon from "@mui/icons-material/Attachment";
import { Box, Button, Theme, Tooltip } from "@mui/material";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { withStyles } from "@mui/styles";
import React from "react";
import excel from "../../assets/outlined/excel.png";
import pdf from "../../assets/outlined/pdf.png";
import word from "../../assets/outlined/word.png";
import file from "../../assets/outlined/file.png";
import image from "../../assets/outlined/image.png";

const msword = ["doc", "docx"];
const xcel = ["xls", "xlsx"];
const images = ["jpg", "jpeg", "png", "gif", "ico", "tiff", "pjp", "xbm", "jxl", "svg", "svgz", "jfif", "webp", "bmp", "pjeg", "avif"];

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
        return <img src={word} alt="excel" width="25px" height="25px" />;
    } else if (xcel.some((e) => e === ext)) {
        return <img src={excel} alt="excel" width="25px" height="25px" />;
    } else if (images.some((e) => e === ext)) {
        return <img src={image} alt="excel" width="30px" height="25px" style={{ paddingLeft: "3px" }} />;
    } else if (ext === "pdf") {
        return <img src={pdf} alt="excel" width="25px" height="25px" />;
    }
    return <img src={file} alt="excel" width="25px" height="25px" />;
}

export interface FileTooltipPropsI {
    attachFiles: AttachFileInteface[];
    onClickDownload?: (id: string | number, fileName: string) => void;
    attachIcon?: React.ReactNode;
    attachIconColor?: "default" | "primary" | "secondary" | "inherit" | undefined;
}

export const FileTooltip = (props: FileTooltipPropsI) => {
    const { attachFiles, attachIcon, attachIconColor, onClickDownload } = props;

    return (
        <>
            {attachFiles && (
                <HtmlTooltip
                    //   interactive
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
                    <Button disableRipple size="small" disableFocusRipple startIcon={attachIcon ? attachIcon : <AttachmentIcon />}>
                        ({attachFiles.length})
                    </Button>
                </HtmlTooltip>
            )}
        </>
    );
};
