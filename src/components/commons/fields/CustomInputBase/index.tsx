import { FormHelperText, InputBase, InputLabel } from "@material-ui/core";
import { getIn } from "formik";
import React from "react";
import { FieldGeneral } from "../Interface";

type CustomInputBase<T, K extends object> = Pick<FieldGeneral<T, K>, "name" | "formik" | "label" | "required" | "disabled" | "nameObject">;

const CustomInputBase = <T extends { [key: string]: any }, K extends object>({
    formik,
    name,
    label,
    required = false,
    disabled = false,
    nameObject,
}: CustomInputBase<T, K>) => {
    return (
        <>
            <InputLabel error={Boolean(getIn(formik && formik.touched, `${name}`) && getIn(formik && formik.errors, `${name}`))} required={required}>
                {label}
            </InputLabel>
            <InputBase
                name={nameObject ? nameObject : `${name}`}
                value={
                    nameObject
                        ? formik && nameObject && formik.values[nameObject.split(".")[0]][nameObject.split(".")[1]]
                        : formik && name && formik.values[name]
                }
                onChange={(e) => {
                    if (nameObject) {
                        formik && nameObject && formik.setFieldValue && formik.setFieldValue(`${nameObject}`, e.target.value);
                        return;
                    }
                    formik && formik.setFieldValue && formik.setFieldValue(`${name}`, e.target.value);
                }}
                fullWidth
                rows={3}
                disabled={disabled}
                multiline
                error={Boolean(getIn(formik && formik.touched, `${name}`) && getIn(formik && formik.errors, `${name}`))}
            />
            {Boolean(getIn(formik && formik.touched, `${name}`) && getIn(formik && formik.errors, `${name}`)) && (
                <FormHelperText className="-error">{formik && name && formik.errors[name]}</FormHelperText>
            )}
        </>
    );
};

export default CustomInputBase;
