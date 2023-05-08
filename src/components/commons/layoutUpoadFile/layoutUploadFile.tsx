import { Box, Button, IconButton } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& > *": {
                margin: theme.spacing(1),
            },
        },
        button: {
            margin: "0px 5px",
        },
        container: {
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
            /* transition: border .24s ease-in-out, */
        },
    })
);

export interface AttachFileInteface {
    id: number;
    fileName: string;
    type: string;
    base64Content: string;
    extension: string;
    url: string;
}

export interface LayoutUploadFilePropsI {
    attachFiles: AttachFileInteface[];
    onRemoveFile: (i: number) => void;
    onUploadClick: (file: any) => void;
}

export const LayoutUploadFile = (props: LayoutUploadFilePropsI) => {
    const classes = useStyles();

    const { onRemoveFile, onUploadClick } = props;
    const [attachFiles, setAttachFiles] = useState<AttachFileInteface[]>([]);

    useEffect(() => {
        setAttachFiles(props.attachFiles);
    }, [props.attachFiles]);
    return (
        <>
            <table>
                {attachFiles.map((row, i) => {
                    return (
                        <tr key={i}>
                            <td style={{ paddingRight: "10px" }}>
                                <img src={process.env.PUBLIC_URL + "/images/" + row.extension + ".png"} alt="files" />
                            </td>
                            <td>{row.fileName}</td>
                            <td>
                                <IconButton disableRipple color="secondary" onClick={() => onRemoveFile(i)}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </td>
                        </tr>
                    );
                })}
            </table>
            <div className={classes.container}>
                <Box component="span" fontSize="13px" mb="5px">
                    Kéo và thả tập tin vào đây hoặc
                </Box>
                <input accept="doc,docx,dot,xls,xlsx,pdf" hidden={true} id="contained-button-file" type="file" onChange={onUploadClick} multiple={false} />
                <label htmlFor="contained-button-file">
                    <Button variant="outlined" size="small" color="default" component="span" disableElevation style={{ marginRight: "10px" }}>
                        Chọn tập tin
                    </Button>
                </label>
            </div>
        </>
    );
};
