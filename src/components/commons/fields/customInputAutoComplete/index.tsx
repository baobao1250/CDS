import { Box, createStyles, FormHelperText, InputLabel, makeStyles, TextField, Theme, Typography } from "@material-ui/core";
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
            },
            "& .MuiAutocomplete-option": {
                padding: 0,
            },
        },
    })
);

const CustomAutoCompleteInputCheckBox = <T extends { [key: string]: any }, K extends object>({
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
    max,
}: FieldGeneral<T, K>) => {
    const classes = useStyles();

    return (
        <DropTarget onHit={(e: any) => handleDrop && handleDrop(e, `${name}`)} targetKey="foo">
            <InputLabel required={required} error={Boolean(getIn(formik && formik.errors, `${name}`))}>
                {label}
            </InputLabel>
            <Autocomplete
                disabled={disabled}
                classes={classes}
                multiple
                disableCloseOnSelect
                options={options ? options : []}
                onChange={(_e, val, reason, details) => {
                    if (max) {
                        if (formik && name && formik.values[`${name}`].length === max && reason === "select-option") return;
                    }
                    if (val) {
                        formik && formik.setFieldValue && formik.setFieldValue(`${name}`, val);
                        handleChangeOveride &&
                            name &&
                            handleChangeOveride(details?.option, `${name}`, reason === "select-option" ? true : false);
                    }
                }}
                value={formik && name && formik.values[`${name}`]}
                getOptionSelected={(option, value) => option[`${fieldValue}`] === value[`${fieldValue}`]}
                getOptionLabel={(option) => `${fieldString && option[fieldString]}`}
                renderOption={(option, { selected }) => {
                    return (
                        <Box style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                        
                            {option.icon && (
                                <Box style={{ marginRight: 5, marginTop: 4 }}>
                                    <img src={option.icon} width="15" />{" "}
                                </Box>
                            )}
                            <Typography variant="body2" gutterBottom style={{ fontSize: 13, marginTop: 4 }}>
                                {fieldString && option[fieldString]}
                            </Typography>
                        </Box>
                    );
                }}
                renderTags={(selected) => {
                    let renderTagsValue = selected
                        .map(function (elem) {
                            return fieldString && elem[fieldString];
                        })
                        .join(", ");

                    return (
                        <Typography
                            style={{ maxWidth: "95%", position: "absolute", zIndex: 99, left: "8px", fontSize: "13px" }}
                            noWrap={true}
                            color="textPrimary"
                        >
                            {renderTagsValue}
                        </Typography>
                    );
                }}
                renderInput={({ InputProps, inputProps }: AutocompleteRenderInputParams) => {
                    return (
                        <TextField
                            required={required}
                            fullWidth
                            error={Boolean(getIn(formik && formik.errors, `${name}`))}
                            InputProps={{
                                ref: InputProps.ref,
                                disableUnderline: true,
                                inputProps: inputProps,
                                startAdornment: InputProps.startAdornment,
                                style: { color: "transparent" },
                            }}
                        />
                    );
                }}
            />
            {Boolean(getIn(formik && formik.errors, `${name}`)) && (
                <FormHelperText className="-error">{formik && name && formik.errors[name]}</FormHelperText>
            )}
        </DropTarget>
    );
};

export default CustomAutoCompleteInputCheckBox;
