import { createStyles, FormHelperText, InputLabel, makeStyles, TextField, Theme } from "@material-ui/core";
import { Autocomplete, AutocompleteRenderInputParams } from "@material-ui/lab";
import { getIn } from "formik";
import React from "react";
import { DropTarget } from "react-drag-drop-container";
import { FieldGeneral } from "../Interface";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        paper: {
            margin: 0,
            "& .MuiAutocomplete-listbox": {
                padding: 0,
                maxHeight: "25vh",
            },
            "& .MuiAutocomplete-option": {
                padding: 0,
                margin: "5px 10px",
            },
        },
    })
);

const CustomSearchAutoComplete = <T extends { [key: string]: any }, K extends object>({
    formik,
    label,
    name,
    required = false,
    disabled = false,
    options,
    fieldString,
    fieldValue,
    handleDrop,
    handleChangeOveride,
    getValue,
    checkAutoComplate = false,
}: FieldGeneral<T, K>) => {
    const classes = useStyles();

    const [newValue, setNewValue] = React.useState<K | null>(null);

    React.useEffect(() => {
        if (!checkAutoComplate && getValue && options && options.length > 0 && !newValue) {
            if (formik && name && formik.values[name] && fieldValue) {
                const value = options.find((item) => `${item[fieldValue]}` == `${formik.values[name]}`);
                value && formik.setFieldValue && formik.setFieldValue(`${name}`, value[fieldValue]);
                value && setNewValue(value);
            }
        }
    }, [formik?.values, getValue, options, newValue]);

    function renderValue() {
        if (formik && name) {
            if (formik.values[`${name}`] === "") {
                return { ten: "-- Chọn --", duongDan: "" };
            }
            if (formik.values[`${name}`] && !getValue) {
                return formik.values[`${name}`];
            }
            if (getValue) {
                return newValue;
            }
        }
    }

    return (
        <DropTarget onHit={(e: any) => handleDrop && handleDrop(e, `${name}`)} targetKey="foo">
            <InputLabel required={required} error={Boolean(getIn(formik && formik.touched, `${name}`) && getIn(formik && formik.errors, `${name}`))}>
                {label}
            </InputLabel>
            <Autocomplete
                disabled={disabled}
                classes={classes}
                options={options ? options : []}
                onChange={(_e, val, reason, details) => {
                    if (val) {
                        setNewValue(val);
                        formik &&
                            formik.setFieldValue &&
                            formik.setFieldValue(`${name}`, getValue && Boolean(getValue) ? (val[fieldValue] ? val[fieldValue] : "") : val);
                        handleChangeOveride && name && handleChangeOveride(details?.option, `${name}`, reason === "select-option" ? true : false);
                    }
                }}
                value={renderValue()}
                getOptionSelected={(option, value) => option[`${fieldValue}`] == value[`${fieldValue}`]}
                getOptionLabel={(option) => {
                    if (fieldString && option[fieldString]) {
                        return `${fieldString && option[fieldString]}`;
                    } else if (options && fieldValue) {
                        let chosenOption = options.find((opt) => opt[fieldValue] == option[fieldValue]);
                        return fieldString && chosenOption ? `${chosenOption[fieldString]}` : "";
                    }
                    return "";
                }}
                renderInput={({ InputProps, inputProps }: AutocompleteRenderInputParams) => {
                    return (
                        <TextField
                            required={required}
                            fullWidth
                            error={Boolean(getIn(formik && formik.touched, `${name}`) && getIn(formik && formik.errors, `${name}`))}
                            InputProps={{
                                ref: InputProps.ref,
                                disableUnderline: true,
                                inputProps: inputProps,
                                startAdornment: InputProps.startAdornment,
                            }}
                        />
                    );
                }}
            />
            {name !== "menuRole" && Boolean(getIn(formik && formik.touched, `${name}`) && getIn(formik && formik.errors, `${name}`)) && (
                <FormHelperText className="-error">{formik && name && formik.errors[name]}</FormHelperText>
            )}
            {name === "menuRole" && Boolean(getIn(formik && formik.touched, `${name}`) && getIn(formik && formik.errors, `${name}`)) && (
                <FormHelperText className="-error">{formik && name && formik.errors[name]["name"]}</FormHelperText>
            )}
        </DropTarget>
    );
};

export default CustomSearchAutoComplete;
