import { InputBase, TextField, withStyles } from "@material-ui/core";
import { getIn } from "formik";
import React from "react";
import StringUtil from "utils/stringUtils";
import { FieldGeneral } from "../Interface/index";

type CustomTextFieldSearch<T, K extends object> = Pick<
    FieldGeneral<T, K>,
    "formik" | "label" | "name" | "nameObject" | "required" | "disabled" | "InputProps" | "placeholder" | "type" | "handleBlur"
>;

const InputField = withStyles({
    root: {
        "& .MuiInputBase-input": {
            height: "22px",
            fontSize: "13px",
            border: "none",
            background: "#FFF",
            borderRadius: "4px",
        },
        borderRadius: "4px",
        background: "#FFF",
    },
})(TextField);

const CustomTextFieldSearch = <T extends { [key: string]: any }, K extends object>({
    formik,
    label,
    name,
    required = false,
    disabled = false,
    nameObject,
    InputProps,
    placeholder,
    type = "text",
    handleBlur,
}: CustomTextFieldSearch<T, K>) => {
    const [value, setValue] = React.useState<String>("");

    function rendervalue() {
        if ((type === "text" || type === "number") && name && formik) {
            setValue(formik.values[`${name}`] && String(formik.values[`${name}`]));
        }
        if (type === "currency" && name && formik) {
            formik.values[`${name}`] && setValue(StringUtil.formatMoney(`${formik.values[`${name}`]}`));
        }

        if ((type === "text" || type === "number") && nameObject && formik) {
            setValue(
                formik.values[nameObject.split(".")[0]][nameObject.split(".")[1]] && String(formik.values[nameObject.split(".")[0]][nameObject.split(".")[1]])
            );
        }
        if (type === "currency" && nameObject && formik) {
            setValue(StringUtil.formatMoney(formik.values[nameObject.split(".")[0]][nameObject.split(".")[1]]));
        }
    }

    React.useEffect(() => {
        rendervalue();
    }, [formik && formik.values]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (type === "number") {
            formik &&
                formik.setFieldValue &&
                formik.setFieldValue(
                    nameObject ? nameObject : `${name}`,
                    StringUtil.checkInputNumber(e.target.value) || e.target.value === "" ? e.target.value : value + ""
                );
            setValue(StringUtil.checkInputNumber(e.target.value) || e.target.value === "" ? e.target.value : value + "");
            return;
        }
        formik && formik.setFieldValue && formik.setFieldValue(nameObject ? nameObject : `${name}`, e.target.value);
        setValue(e.target.value);
    }

    return (
        <InputField
            fullWidth
            placeholder={placeholder}
            required={required}
            label={label}
            disabled={disabled}
            type="text"
            name={nameObject ? nameObject : `${name}`}
            value={value && value}
            onChange={handleChange}
            InputProps={{
                disableUnderline: true,
                ...InputProps,
            }}
            onBlur={(e) => handleBlur && handleBlur(e.target.value)}
            error={Boolean(getIn(formik && formik.errors, nameObject ? nameObject : `${name}`))}
            FormHelperTextProps={{ className: "-error" }}
            helperText={
                nameObject
                    ? Boolean(getIn(formik && formik.touched, `${nameObject}`) && getIn(formik && formik.errors, `${nameObject}`)) &&
                      formik &&
                      formik.errors[`${nameObject?.split(".")[0]}`][`${nameObject?.split(".")[1]}`]
                    : Boolean(getIn(formik && formik.errors, `${name}`)) && formik && formik.errors[`${name}`]
            }
        />
    );
};

export default CustomTextFieldSearch;
