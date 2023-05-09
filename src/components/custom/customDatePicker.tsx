import { FormHelperText, InputLabel, TextField } from "@mui/material";
import { withStyles } from "@mui/styles";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { split } from "lodash";
import _get from "lodash/get";
import React from "react";

export interface CustomDatePickerProps {
    name: string;
    placeholder?: string;
    required?: boolean;
    value: Date | null;
    setValue: any;
    errors: any;
    backgroundColor?: string;
    disabled?: boolean;
    title?: string;
    format?: string;
    register: any;
    isBold?: boolean;
    errorPath?: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    name,
    value = null,
    placeholder,
    required,
    setValue,
    errors,
    backgroundColor,
    disabled,
    title,
    format,
    register,
    isBold,
    errorPath,
}) => {
    const messageCommon = errors && Object.keys(errors).length > 0 && _get(errors, [`${name}`, "message"], "");
    const messageCustom = errors && Object.keys(errors).length > 0 && _get(errors, split(`${name}`, '.'), `${name}`);
    const message = !errorPath ? messageCommon : messageCustom.message;

    const InputField: any = withStyles({
        root: {
            borderRadius: "2px",
            boder: "none",

            "& .MuiOutlinedInput-input": {
                paddingLeft: "14px",
                paddingTop: "8px",
                paddingBottom: "8px",
                paddingRight: "0px",
                backgroundColor: `${backgroundColor}` ?? "#FFF",
                fontFamily: "Roboto",
                borderRadius: "2px",
                boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.25)",
            },
            "& label.Mui-focused": {
                color: "#D7D7D7",
                boder: "none",
            },

            "& .MuiInputAdornment-root": {
                position: "absolute",
                right: "10px",
            },

            "& .MuiInput-underline:after": {
                borderBottomColor: "transparent",
                boder: "none",
            },
            "& .MuiOutlinedInput-root": {
                paddingRight: "0px",
                "& fieldset": {
                    borderColor: "transparent",
                    borderRadius: "2px",
                },
                "&:hover fieldset": {
                    borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                },
            },
        },
    })(TextField);

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            {title && (
                <InputLabel sx={{ marginBottom: 1, fontWeight: "bold", color: "#000" }}>
                    {title}
                    {required && <span style={{ color: "#db3131" }}>{" *"}</span>}
                </InputLabel>
            )}
            <DatePicker
                // {...register(name)}
                inputFormat={format ?? "DD/MM/YYYY"}
                value={value ?? null}
                disabled={disabled}
                onChange={(newValue) => setValue(`${name}`, newValue)}
                renderInput={(params) => (
                    <InputField
                        {...params}
                        fullWidth
                        inputProps={{
                            ...params.inputProps,
                            placeholder: placeholder ? placeholder : value ? value : "",
                        }}
                    />
                )}
                // maxDate={new Date()}
            />
            {message && <FormHelperText error>{message}</FormHelperText>}
        </LocalizationProvider>
    );
};

export default CustomDatePicker;
