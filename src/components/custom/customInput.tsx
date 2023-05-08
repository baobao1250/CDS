import { FormHelperText, InputLabel } from "@mui/material";
import { split } from "lodash";
import _get from "lodash/get";
import React from "react";
import { InputField } from "./inputField";

export interface CustomInputProps {
    name: string;
    placeholder?: string;
    required?: boolean;
    register: any;
    errors: any;
    type?: "password";
    onChange?: (e: any) => void;
    readonly?: boolean;

    title?: string;
    disabled?: boolean;
    endAdornment?: any;
    errorPath?:boolean;
    maxInput?: number;
}

const CustomInput: React.FC<CustomInputProps> = ({
    name,
    placeholder,
    required,
    register,
    errors,
    type = "text",
    onChange,
    readonly = false,
    title,
    disabled,
    endAdornment,
    errorPath,
    maxInput
}) => {
    const messageCommon = errors && Object.keys(errors).length > 0 && _get(errors, [`${name}`, "message"], "");
    const messageCustom = errors && Object.keys(errors).length > 0 && _get(errors, split(`${name}`,'.'), `${name}`);
    const message = !errorPath ? messageCommon : messageCustom.message;

    return (
        <>
            {title && (
                <InputLabel sx={{ marginBottom: 1, fontWeight: "bold", color: "#000" }}>
                    {title}
                    {required && <span style={{ color: "#db3131" }}>{" *"}</span>}
                </InputLabel>
            )}

            {onChange ? (
                <InputField
                    {...register(name)}
                    disabled={disabled}
                    fullWidth
                    name={name}
                    placeholder={placeholder}
                    type={type}
                    onChange={onChange}
                    InputProps={{
                        readOnly: readonly,
                        endAdornment: endAdornment,
                    }}
                    inputProps={{
                        autoComplete: "new-password",
                        form: {
                            autoComplete: "off",
                        },
                        min: 0,
                        max: maxInput,
                    }}
                />
            ) : (
                <InputField
                    {...register(name)}
                    disabled={disabled}
                    fullWidth
                    name={name}
                    placeholder={placeholder}
                    type={type}
                    InputProps={{
                        readOnly: readonly,
                        endAdornment: endAdornment,
                    }}
                    inputProps={{
                        autoComplete: "new-password",
                        form: {
                            autoComplete: "off",
                        },
                        min: 0,
                        max: maxInput,
                    }}
                />
            )}
            {message && <FormHelperText error>{message}</FormHelperText>}
            
        </>
    );
};

export default CustomInput;
