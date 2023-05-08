import { Dialog, makeStyles } from "@material-ui/core";
import React from "react";
import { SketchPicker } from "react-color";

export interface DialogColorProps {
    colorOf: string;
    openColor: boolean;
    handleClose: (colorOf: string, color: string) => void;
}

const useStyles = makeStyles({
    paper: {
        position: "relative",
    },
});

const DialogColor: React.FC<DialogColorProps> = ({ openColor, handleClose, colorOf }) => {
    const classes = useStyles();

    const [color, setColor] = React.useState<string>(colorOf === "colorActive" ? "#367fa9" : "#aaa");

    return (
        <Dialog classes={classes} aria-labelledby="customized-dialog-title" open={openColor} onClose={() => handleClose(colorOf, color)}>
            <SketchPicker
                color={color}
                disableAlpha
                onChangeComplete={(color) => {
                    setColor(color.hex);
                }}
            />
        </Dialog>
    );
};

export default DialogColor;
