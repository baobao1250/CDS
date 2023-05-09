import { InputLabel } from "@mui/material";
import React from "react";

export interface CustomInputLabelProps {
    text: string;
    required?: boolean;
    fontWeight?: number;
    color?: string;
}

export const CustomInputLabel = ({ text, required, fontWeight, color }: CustomInputLabelProps) => {
    return (
        <InputLabel sx={{ marginBottom: 1, fontWeight: fontWeight ?? 700, color: color ?? "#000" }}>
            {text}
            {required && <span style={{ color: "#db3131" }}>{" *"}</span>}
        </InputLabel>
    );
};
