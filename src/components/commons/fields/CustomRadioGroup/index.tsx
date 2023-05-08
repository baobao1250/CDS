import { FormControlLabel, FormHelperText, InputLabel, makeStyles, Radio, RadioGroup, RadioProps } from "@material-ui/core";
import { getIn } from "formik";
import React from "react";
import { FieldGeneral } from "../Interface";

const useStyles = makeStyles({
    root: {
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    icon: {
        borderRadius: "50%",
        width: 16,
        height: 16,
        boxShadow: "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
        backgroundColor: "#f5f8fa",
        backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
        "$root.Mui-focusVisible &": {
            outline: "2px auto rgba(19,124,189,.6)",
            outlineOffset: 2,
        },
        "input:hover ~ &": {
            backgroundColor: "#ebf1f5",
        },
        "input:disabled ~ &": {
            boxShadow: "none",
            background: "rgba(206,217,224,.5)",
        },
    },
});

export function StyledRadio(props: RadioProps) {
    const classes = useStyles();

    return <Radio className={classes.root} disableRipple color="default" icon={<span className={classes.icon} />} {...props} />;
}

type CustomRadioGroup<T, K extends object> = Pick<
    FieldGeneral<T, K>,
    "formik" | "name" | "label" | "required" | "disabled" | "options" | "fieldString" | "fieldValue" | "type"
>;

const CustomRadioGroup = <T extends { [key: string]: any }, K extends object>({
    formik,
    name,
    label,
    required,
    disabled = false,
    options,
    fieldString,
    fieldValue,
    type,
}: CustomRadioGroup<T, K>) => {
    return (
        <>
            <InputLabel required={required} error={Boolean(getIn(formik && formik.touched, `${name}`) && getIn(formik && formik.errors, `${name}`))}>
                {label}
            </InputLabel>
            <RadioGroup
                row
                name={`${name}`}
                value={formik && name && String(formik.values[name])}
                onChange={(e) => {
                    formik && formik.setFieldValue && formik.setFieldValue(`${name}`, type === "number" ? Number(e.target.value) : String(e.target.value));
                }}
            >
                {options?.map((item) => (
                    <FormControlLabel
                        value={String(fieldValue && item[fieldValue])}
                        control={<StyledRadio size="small" color="default" />}
                        label={fieldString && item[fieldString]}
                        labelPlacement="end"
                    />
                ))}
            </RadioGroup>
            {Boolean(getIn(formik && formik.touched, `${name}`) && getIn(formik && formik.errors, `${name}`)) && (
                <FormHelperText className="-error">{formik && name && formik.errors[name]}</FormHelperText>
            )}
        </>
    );
};

export default CustomRadioGroup;
