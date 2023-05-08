import { capitalize } from "@material-ui/core";
import MuiButton, { ButtonProps as MuiButtonProps } from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

export type ColorTypes = "primary" | "secondary" | "error" | "success" | "warning" | "default" | "inherit" | "info";

type ButtonProps = { color: ColorTypes } & Omit<MuiButtonProps, "color">;

const useStyles = makeStyles<Theme>((theme) =>
    createStyles({
        outlinedSuccess: {
            borderColor: theme.palette.success.main,
            color: theme.palette.success.main,
        },
        outlinedError: {
            borderColor: theme.palette.error.main,
            color: theme.palette.error.main,
        },
        outlinedWarning: {
            borderColor: theme.palette.warning.main,
            color: theme.palette.warning.main,
        },
        outlinedInfo: {
            borderColor: theme.palette.info.main,
            color: theme.palette.info.main,
        },
        containedSuccess: {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText,
            "&:hover": {
                backgroundColor: theme.palette.success.dark,
            },
        },
        containedError: {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
            "&:hover": {
                backgroundColor: theme.palette.error.dark,
            },
        },
        containedWarning: {
            backgroundColor: theme.palette.warning.main,
            color: theme.palette.warning.contrastText,
            "&:hover": {
                backgroundColor: theme.palette.warning.dark,
            },
        },
        containedInfo: {
            backgroundColor: theme.palette.info.main,
            color: theme.palette.info.contrastText,
            "&:hover": {
                backgroundColor: theme.palette.info.dark,
            },
        },
    })
);

const ButtonExt: React.FC<ButtonProps> = ({ children, color, ...props }) => {
    const classes = useStyles();
    const className = classes?.[`${props.variant}${capitalize(color)}`];
    const colorProp =
        ["default", "inherit", "primary", "secondary"].indexOf(color) > -1 ? (color as "default" | "inherit" | "primary" | "secondary") : undefined;

    return (
        <MuiButton {...props} color={colorProp} className={className}>
            {children}
        </MuiButton>
    );
};

ButtonExt.displayName = "Button";

export default ButtonExt;
