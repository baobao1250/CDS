import { FormHelperText, InputBase, InputLabel, NativeSelect } from "@material-ui/core";
import { getIn } from "formik";
import React from "react";
import { FieldGeneral } from "../Interface";

type CustomNativeSelect<T, K extends object> = Pick<
    FieldGeneral<T, K>,
    "formik" | "name" | "label" | "required" | "disabled" | "options" | "fieldString" | "fieldValue" | "type" | "nameObject"
>;

const CustomNativeSelect = <T extends { [key: string]: any }, K extends object>({
    formik,
    name,
    label,
    required,
    disabled = false,
    options,
    fieldString,
    fieldValue,
    type,
    nameObject,
}: CustomNativeSelect<T, K>) => {
    const defaultTitle = "title";
    const defaultValue = "value";

    return (
        <>
            <InputLabel
                required={required}
                error={
                    Boolean(getIn(formik && formik.errors, `${name}`)) ||
                    Boolean(getIn(formik && formik.touched, `${nameObject}`) && getIn(formik && formik.errors, `${nameObject}`))
                }
            >
                {label}
            </InputLabel>
            <NativeSelect
                name={`${nameObject ? nameObject : name}`}
                value={
                    nameObject
                        ? formik && nameObject && formik.values[nameObject.split(".")[0]][nameObject.split(".")[1]]
                        : formik && name && String(formik.values[name])
                }
                onChange={(e) => {
                    if (nameObject) {
                        formik &&
                            nameObject &&
                            formik.setFieldValue &&
                            formik.setFieldValue(`${nameObject}`, type === "number" ? Number(e.target.value) : e.target.value);
                        return;
                    }
                    formik &&
                        formik.setFieldValue &&
                        formik.setFieldValue(`${name}`, type === "number" ? Number(e.target.value) : e.target.value);
                }}
                error={
                    Boolean(getIn(formik && formik.errors, `${name}`)) ||
                    Boolean(getIn(formik && formik.touched, `${nameObject}`) && getIn(formik && formik.errors, `${nameObject}`))
                }
                input={<InputBase fullWidth />}
                disabled={disabled}
                style={{ lineHeight: "15px" }}
            >
                {type === "number" && <option value={`NaN`}>-- Chọn --</option>}
                {options &&
                    options.map((item: any, idx) => (
                        <option key={idx} value={fieldValue ? String(fieldValue && item[fieldValue]) : String(item[defaultValue])}>
                            {fieldString && item[fieldString] ? fieldString && item[fieldString] : item[defaultTitle]}
                        </option>
                    ))}
            </NativeSelect>
            {Boolean(getIn(formik && formik.errors, `${name}`)) && (
                <FormHelperText className="-error">{formik && name && formik.errors[name]}</FormHelperText>
            )}
            {Boolean(getIn(formik && formik.touched, `${nameObject}`) && getIn(formik && formik.errors, `${nameObject}`)) && (
                <FormHelperText className="-error">
                    {formik && nameObject && formik.errors[`${nameObject?.split(".")[0]}`][`${nameObject?.split(".")[1]}`]}
                </FormHelperText>
            )}
        </>
    );
};

export default CustomNativeSelect;
