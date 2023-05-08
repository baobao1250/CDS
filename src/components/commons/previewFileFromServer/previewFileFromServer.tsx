import { Box, createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { blue } from "@material-ui/core/colors";
import CloseIcon from "@material-ui/icons/Close";
import GetAppIcon from "@material-ui/icons/GetApp";
import { AttachFileDTO } from "models/attachFileDTO";
import React from "react";
import { AttachIcon } from "../attachFileTooltip/attachFileTooltip";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& > *": {
                margin: theme.spacing(1),
            },
        },
        nameFile: {
            textDecoration: "none",
            color: blue[500],
            marginRight: "auto",
        },
        button: {
            margin: "0px 5px",
        },
        container: {
            marginTop: "5px",
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            borderWidth: "2px",
            borderRadius: "2px",
            borderStyle: "dashed",
            backgroundColor: "#fafafa",
            color: "#bdbdbd",
            outline: "none",
        },
        buttonFile: {
            justifyContent: "flex-start",
            color: blue[500],
        },
    })
);

interface PreviewDropzoneI {
    files: AttachFileDTO[];
    onDelete: (f: AttachFileDTO) => void;
    onDownload: (f: AttachFileDTO) => void;
    isView?: boolean;
}

const PreviewDropzoneFromServer: React.FC<PreviewDropzoneI> = ({ files, onDelete, onDownload, isView }) => {
    const classes = useStyles();
    return (
        <>
            {files.map((item, i) => {
                if (item.isDeleted || !item.name) return null;
                return (
                    <Box key={i} display="flex" style={{ width: "100%", justifyContent: "space-between" }}>
                        <Box display="flex" flexGrow="1" flexDirection="column" key={i}>
                            <Button
                                size="small"
                                className={classes.buttonFile}
                                disableRipple
                                startIcon={<AttachIcon fileName={`${item.name}`} />}
                                style={{
                                    display: "flex",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    width: "100%",
                                    whiteSpace: "nowrap",
                                }}
                                endIcon={item.docId && <GetAppIcon fontSize="small" />}
                                onClick={() => onDownload(item)}
                            >
                                {item.name?.length > 30 ? item.name?.slice(0, 33) + "..." + item.name?.slice(40 + 1) : item.name}
                            </Button>
                        </Box>

                        <IconButton disabled={isView} onClick={() => onDelete(item)} size="small" disableRipple color="secondary">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>
                );
            })}
        </>
    );
};

export default PreviewDropzoneFromServer;

interface ViewDropzoneI {
    files: AttachFileDTO[];
    onDownload: (f: AttachFileDTO) => void;
}

export const ViewDropzoneFromServer: React.FC<ViewDropzoneI> = ({ files, onDownload }) => {
    const classes = useStyles();
    return (
        <>
            {files.map((item, i) => {
                if (item.isDeleted) return null;
                return (
                    <Box key={i} display="flex" style={{ width: "100%", justifyContent: "space-between" }}>
                        <Box display="flex" flexGrow="1" flexDirection="column" key={i}>
                            <Button
                                size="small"
                                className={classes.buttonFile}
                                disableRipple
                                startIcon={<AttachIcon fileName={`${item.name}`} />}
                                style={{
                                    display: "flex",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    width: "100%",
                                    whiteSpace: "nowrap",
                                }}
                                endIcon={item.docId && <GetAppIcon fontSize="small" />}
                                onClick={() => onDownload(item)}
                            >
                                {item.name?.length > 30 ? item.name?.slice(0, 33) + "..." + item.name?.slice(40 + 1) : item.name}
                            </Button>
                        </Box>
                    </Box>
                );
            })}
        </>
    );
};
