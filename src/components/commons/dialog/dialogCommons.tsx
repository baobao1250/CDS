import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import React from "react";
const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: "0px 15px",
            color: "#fff",
            fontWeight: 700,
            fontSize: "13px",
            backgroundColor: "#aaaaaa",
            textTransform: "uppercase",
            border: "solid 1px #d7d7d7",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
        },
        closeButton: {
            position: "absolute",
            right: 0,
            top: 0,
            color: "#d9001b",
        },
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

export const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <p>{children}</p>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CancelPresentationIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

export const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

export const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
