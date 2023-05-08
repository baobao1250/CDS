import { KeyboardDatePicker } from "@material-ui/pickers";
import { getIn } from "formik";
import React from "react";
import { FieldGeneral } from "../Interface";

export type typeK<T> = keyof T;

type CustomKeyboardDatePicker<T, K extends object> = Pick<FieldGeneral<T, K>, "formik" | "name" | "label" | "required" | "nameObject" | "names" | "disabled">;

const CustomKeyboardDatePicker = <T extends { [key: string]: any }, K extends object>({
    formik,
    name,
    label,
    required = false,
    nameObject,
    names,
    disabled = false,
}: CustomKeyboardDatePicker<T, K>) => {
    function handleChange(date: any, _val: any): void {
        if (names) {
            names.forEach((item) => {
                if (/Str/.test(`${item}`)) {
                    formik && formik.setFieldValue && formik.setFieldValue(`${String(item)}`, _val);
                }
                formik && formik.setFieldValue && formik.setFieldValue(`${String(nameObject ? nameObject : item)}`, date);
            });
        }
        if (nameObject) {
            formik && formik.setFieldValue && formik.setFieldValue(`${nameObject}`, date);
            return;
        }
        if (name) {
            formik && formik.setFieldValue && formik.setFieldValue(`${name}`, date);
        }
    }

    function renderValue() {
        if (formik) {
            if (nameObject) {
                return formik.values[nameObject.split(".")[0]][nameObject.split(".")[1]];
            }
            return formik.values[`${name}`];
        }
    }

    return (
        <>
            <KeyboardDatePicker
                name={`${nameObject ? nameObject : name}`}
                label={label}
                required={required}
                value={renderValue()}
                onChange={(date, _val) => handleChange(date, _val)}
                autoOk={true}
                disabled={disabled}
                fullWidth
                format="DD/MM/YYYY"
                InputAdornmentProps={{ className: "button-date-picker" }}
                variant="inline"
                InputProps={{ disableUnderline: true }}
                error={Boolean(
                    getIn(formik && formik.touched, `${nameObject ? nameObject : name}`) && getIn(formik && formik.errors, `${nameObject ? nameObject : name}`)
                )}
                FormHelperTextProps={{ className: "-error" }}
                helperText={
                    nameObject
                        ? Boolean(getIn(formik && formik.touched, `${nameObject}`) && getIn(formik && formik.errors, `${nameObject}`)) &&
                          formik &&
                          formik.errors[`${nameObject?.split(".")[0]}`][`${nameObject?.split(".")[1]}`]
                        : Boolean(getIn(formik && formik.touched, `${name}`) && getIn(formik && formik.errors, `${name}`)) && formik && formik.errors[`${name}`]
                }
                invalidDateMessage="Định dạng không đúng DD/MM/YYYY"
            />
        </>
    );
};

export default CustomKeyboardDatePicker;
