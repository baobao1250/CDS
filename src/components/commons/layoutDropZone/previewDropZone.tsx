import { Box, CircularProgress, createStyles, Fade, IconButton, LinearProgress, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { blue } from "@material-ui/core/colors";
import CancelIcon from "@material-ui/icons/Cancel";
import CloseIcon from "@material-ui/icons/Close";
import GetAppIcon from "@material-ui/icons/GetApp";
import RefreshIcon from "@material-ui/icons/Refresh";
import React from "react";
import { IPreviewProps } from "react-dropzone-uploader/dist/Dropzone";
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
            marginRight: "auto",
        },
        hoverButton: {
            borderRadius: "5px",
            backgroundColor: "transparent",
            height: "auto",
            width: "400px",
            "&:hover": {
                backgroundColor: "transparent",
            },
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

export const PreviewDropZone = ({ fileWithMeta, meta }: IPreviewProps) => {
    const { name, percent, status } = meta;
    const classes = useStyles();

    function handleCancelFile() {
        fileWithMeta.cancel();
        fileWithMeta.remove();
    }

    return (
        <Box display="flex">
            <Box display="flex" flexGrow="1" flexDirection="column">
                <Button
                    size="small"
                    className={classes.buttonFile}
                    disabled={status === "exception_upload"}
                    disableRipple
                    startIcon={<AttachIcon fileName={name} />}
                    // onClick={() => (status === "done" ? console.log("download") : handleCancelFile())}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                        whiteSpace: "nowrap",
                        color: status === "done" ? "#2196f3" : "red",
                    }}
                    endIcon={
                        <>
                            {/*<GetAppIcon fontSize="small" onClick={() => console.log("download")} />*/}
                            <CancelIcon fontSize="small" style={{ color: status === "error_upload" ? "transparent" : "red" }}
                                onClick={() => handleCancelFile()}
                            />
                        </>
                    }
                >
                    <a className={classes.nameFile}>{name.length > 30 ? name.slice(0, 33) + "..." + name.slice(40 + 1) : name}</a>
                </Button>

                {percent < 100 && status !== "error_upload" && status !== "exception_upload" && (
                    <Box marginBottom={1} width="100%">
                        <LinearProgress variant="determinate" value={Math.round(percent)} />
                    </Box>
                )}
            </Box>
            {status !== "error_upload" && (
                <Box marginTop={0.7}>
                    <Fade
                        in={status !== "done"}
                        unmountOnExit
                        style={{
                            transitionDelay: status !== "done" ? "100ms" : "0ms",
                        }}
                    >
                        <CircularProgress size={20} />
                    </Fade>
                </Box>
            )}
            {status === "error_upload" && (
                <>
                    <IconButton onClick={fileWithMeta.remove} size="small" disableRipple color="secondary">
                        <CloseIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={fileWithMeta.restart} size="small" disableRipple color="primary">
                        <RefreshIcon fontSize="small" />
                    </IconButton>
                </>
            )}
        </Box>
    );
};
