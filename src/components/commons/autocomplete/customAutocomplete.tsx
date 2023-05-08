import React from "react";
import { createStyles, Theme, withStyles } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

export const CustomAutocomplete = withStyles((theme: Theme) =>
    createStyles({
        inputRoot: {
            border: "solid 1px #ced4da",
            borderRadius: "4px",
            "&.MuiInput-underline::before": {
                content: "none",
            },
            "&.MuiInput-underline::after": {
                content: "none",
            },
            "&.Mui-focused": {
                border: "solid 1px #80bdff",
            },
        },
    })
)(Autocomplete);
