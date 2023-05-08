import React from "react";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
export type AlertMessage = {
    severity: "success" | "error";
    open: boolean;
    content: string;
};
export const CustomAlert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};
