import ClearIcon from "@mui/icons-material/Clear";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { fontWeight } from "@mui/system";
import { split } from "lodash";
import _get from "lodash/get";
import React from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export interface CustomSelectProps {
    name: string;
    value: string;
    setValue: any;
    placeholder?: string;
    options: Array<any>;
    fieldValue?: string;
    fieldTitle?: string;
    fieldIcon?: string;
    required?: boolean;
    errors: any;
    isDrawer?: boolean;
    title: string;
    disabled?: boolean;
    isBold?: boolean;
    backgroundColor?: string;
    textColor?: string;
    valueDefault?: string;
    errorPath?: boolean;
    typeNumber?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
    name,
    value,
    placeholder,
    options,
    fieldTitle,
    fieldValue,
    fieldIcon,
    setValue,
    required,
    errors,
    isDrawer,
    title,
    disabled,
    isBold,
    backgroundColor,
    textColor,
    valueDefault,
    errorPath,
    typeNumber,
}) => {
    const defaultTitle = fieldTitle || "title";
    const defaultValue = fieldValue || "value";
    const defaultIcon = fieldIcon || "icon";

    const messageCommon = errors && Object.keys(errors).length > 0 && _get(errors, [`${name}`, "message"], "");
    const messageCustom = errors && Object.keys(errors).length > 0 && _get(errors, split(`${name}`, "."), `${name}`);
    const message = !errorPath ? messageCommon : messageCustom.message;

    const [open, setOpen] = React.useState<boolean>(false);

    let newValue = value || "";
    function handleClear() {
        setValue(name, valueDefault ? valueDefault : "");
        if (typeNumber) {
            setValue(name, valueDefault ? valueDefault : 0);
        } else {
            setValue(name, valueDefault ? valueDefault : "");
        }
    }

    const MenuProps = {
        PaperProps: {
            style: {
                marginTop: "5px",
                marginLeft: isDrawer ? "6px" : "0px",
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                // width: 300,
                borderRadius: "0px",
                borderBottomRightRadius: "2px",
                borderBottomLeftRadius: "2px",
            },
        },
    };

    const handleCheckIcon = (defaultIcon: string) => {
        return <div> hello</div>;
    };

    return (
        <>
            {title && (
                <InputLabel sx={{ marginBottom: 1, fontWeight: "bold", color: "#000" }}>
                    {title}
                    {required && <span style={{ color: "#db3131" }}>{" *"}</span>}
                </InputLabel>
            )}
            <FormControl fullWidth>
                <Select
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    open={open}
                    onClick={() => {
                        if ((options && options.length === 0) || !options || disabled) return;
                        setOpen(!open);
                    }}
                    disabled={disabled}
                    sx={{
                        "& .MuiSelect-select": {
                            background: !Boolean(disabled) ? (backgroundColor ? backgroundColor : "#FFF") : "#DEDEDE",
                            borderRadius: "2px",
                            color: textColor ? textColor : null,
                        },

                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                            borderRadius: "2px",
                            boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.25)",
                        },

                        "& .MuiOutlinedInput-input:focus": {
                            borderRadius: "2px",
                        },
                        "& .MuiSelect-icon": {
                            position: "relative",
                            marginLeft: "-22px",
                            top: "0px",
                            display: value === valueDefault ? "block" : "none",
                        },
                        paddingRight: 0,
                    }}
                    endAdornment={
                        <ClearIcon
                            style={{
                                position: "absolute",
                                right: 10,
                                display: value !== valueDefault ? "block" : "none",
                                fontSize: "1.5rem",
                                color: "rgba(0, 0, 0, 0.54)",
                                cursor: "pointer",
                            }}
                            onClick={handleClear}
                        />
                    }
                    MenuProps={MenuProps}
                    size="small"
                    name={`${name}`}
                    onChange={(e) => {
                        setValue(name, e.target.value);
                    }}
                    value={newValue}
                >
                    <MenuItem value="" style={{ display: "none" }}>
                        <em
                            style={{
                                color: "#aaaaaa",
                                fontStyle: "normal",
                                fontFamily: "Roboto",
                            }}
                        >
                            {placeholder}
                        </em>
                    </MenuItem>
                    <MenuItem value={"0"} style={{ display: "none" }}>
                        <em
                            style={{
                                color: "#aaaaaa",
                                fontStyle: "normal",
                                fontFamily: "Roboto",
                            }}
                        >
                            {placeholder}
                        </em>
                    </MenuItem>
                    {options &&
                        options.map((item: any, idx) => (
                            <MenuItem key={idx} value={String(item[defaultValue])}>
                                {item[defaultIcon]}

                                {item[defaultTitle]}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
            {message && <FormHelperText error>{message}</FormHelperText>}
        </>
    );
};

export default CustomSelect;
