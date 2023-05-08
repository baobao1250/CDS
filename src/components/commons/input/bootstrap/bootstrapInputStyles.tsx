import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const fontFamily = [
    "Arial",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
].join(",");
const helperTextColor = "#6c757d";
const normalColor = "#80bdff";
const validColor = "#28a745";
const errorColor = "#dc3545";
const helperTextFontSize = 12.8;

const inputRadius = 4;
const borderWidth = 1;
const inputPadding = "0.5rem .75rem";
const borderColor = "#ced4da";

export const bootstrapLabelStyles = makeStyles(
    (theme: Theme) =>
        createStyles({
            root: {
                position: "initial",
                textAlign: "left",
                transform: "none",
                fontSize: 14,
                fontWeight: 700,
                color: "#7F7F7F", // theme.palette.text.primary
                fontFamily,
                "& .MuiFormLabel-asterisk.MuiInputLabel-asterisk": {
                    color: "red",
                    "&::before": {
                        content: '"("',
                        marginRight: -3,
                    },
                    "&::after": {
                        content: '")"',
                    },
                    paddingLeft: 5,
                },
                "&& + *": {
                    // override initial styles
                    // label + .MuiInput-formControl
                    marginTop: theme.spacing(1),
                },
            },
            focused: {
                "&$root": {
                    color: "#7F7F7F", //theme.palette.text.primary
                },
            },
        }),
    { index: 1 }
);

export const bootstrapLabelLeftStyles = makeStyles(
    (theme: Theme) =>
        createStyles({
            root: {
                position: "initial",
                transform: "none",
                fontSize: 14,
                fontWeight: 700,
                color: "#7F7F7F", // theme.palette.text.primary
                fontFamily,
                textAlign: "end",
                padding: 5,
                "& .MuiFormLabel-asterisk.MuiInputLabel-asterisk": {
                    color: "red",
                    "&::before": {
                        content: '"("',
                        marginRight: -3,
                    },
                    "&::after": {
                        content: '")"',
                    },
                    paddingLeft: 5,
                },
                "&& + *": {
                    marginTop: theme.spacing(1),
                },
                // whiteSpace: "nowrap",
                minHeight: "14px",
            },
            focused: {
                "&$root": {
                    color: "#7F7F7F", //theme.palette.text.primary
                },
            },
        }),
    { index: 1 }
);

export const bootstrapLabelRightStyles = makeStyles(
    (theme: Theme) =>
        createStyles({
            root: {
                position: "initial",
                transform: "none",
                fontSize: 14,
                fontWeight: 500,
                color: "#7F7F7F", // theme.palette.text.primary
                fontFamily,
                textAlign: "start",
                padding: 5,
                "& .MuiFormLabel-asterisk.MuiInputLabel-asterisk": {
                    color: "red",
                    "&::before": {
                        content: '"("',
                        marginRight: -3,
                    },
                    "&::after": {
                        content: '")"',
                    },
                    paddingLeft: 5,
                },
                "&& + *": {
                    marginTop: theme.spacing(1),
                },
                minHeight: "14px",
            },
            focused: {
                "&$root": {
                    color: "#7F7F7F", //theme.palette.text.primary
                },
            },
        }),
    { index: 1 }
);

export const bootstrapInputStyles = makeStyles(
    (theme: Theme) =>
        createStyles({
            root: {
                "&.-valid $input": {
                    borderColor: `${validColor} !important`,
                },
            },
            error: {
                "& $input": {
                    borderColor: `${errorColor} !important`,
                },
            },
            input: {
                // boxSizing: 'inherit',
                borderRadius: inputRadius,
                position: "relative",
                backgroundColor: theme.palette.common.white,
                borderWidth,
                borderStyle: "solid",
                borderColor,
                fontSize: 14,
                // height: 'calc(1.5em + .75rem + 2px)',
                padding: inputPadding,
                // lineHeight: 1.5,
                transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                // Use the system font instead of the default Roboto font.
                fontFamily,
                "&:focus": {
                    outline: "none",
                    borderRadius: inputRadius,
                    borderColor: normalColor,
                    // boxShadow: `0 0 0 0.2rem ${Color(normalColor).fade(
                    //     theme.palette.type === 'dark' ? 0.48 : 0.75
                    // )}`,
                },
            },
        }),
    { index: 1 }
);

export const bootstrapInputAdornmentStyles = makeStyles(
    (theme: Theme) =>
        createStyles({
            root: {
                height: "1em",
                "&.MuiInputAdornment-positionEnd": {
                    position: "absolute",
                    right: "5px",
                },
            },
        }),
    { index: 1 }
);

export const bootstrapHelperTextStyles = makeStyles(
    (theme: Theme) =>
        createStyles({
            root: {
                fontFamily,
                color: helperTextColor,
                lineHeight: "19.2px",
                marginTop: theme.spacing(1) / 2,
                fontSize: helperTextFontSize,
                "&.-valid": {
                    color: validColor,
                },
                "&.-error": {
                    color: errorColor,
                },
            },
        }),
    { index: 1 }
);
