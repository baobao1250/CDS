import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import React from "react";
import { ILayoutProps } from "react-dropzone-uploader/dist/Dropzone";

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

interface MyLayoutPropsI extends ILayoutProps {
    acceptFiles: String;
}

const LayoutDrop: React.FC<MyLayoutPropsI> = (props) => {
    const { previews, input, dropzoneProps, acceptFiles } = props;
    const classes = useStyles();
    return (
        <>
            <div>
                {previews}
                <div {...dropzoneProps} className={classes.container}>
                    <Box component="span" fontSize="13px" mb="5px">
                        Kéo và thả tập tin ({acceptFiles}) vào đây hoặc
                    </Box>
                    {input}
                </div>
            </div>
        </>
    );
};

export default LayoutDrop;
