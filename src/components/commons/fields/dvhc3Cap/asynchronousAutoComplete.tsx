import { FormHelperText, IconButton, InputAdornment, InputBase, InputLabel, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { DanhMucService } from "apis/danhMuc/danhMucService";
import { getIn } from "formik";
import { DanhMucDiaChiDTO } from "models/danhMuc/danhMucDTO";
import React from "react";

export interface AsynchronousPropsI {
    id: string;
    name: string;
    label: string;

    placeholder: string;
    dataOption?: DanhMucDiaChiDTO[];
    value?: DanhMucDiaChiDTO | null;
    onChange?: (val: DanhMucDiaChiDTO) => void;
    dependency?: DanhMucDiaChiDTO | null;
    required?: boolean;
    formik: any;
    level: number;
    clearFunc: () => void;
    disabled?: boolean;
}

const useStyles = makeStyles({
    root: {
        position: "absolute",
        right: "10px",
    },
});

export default function Asynchronous(props: AsynchronousPropsI) {
    const classes = useStyles();
    const { id, required, placeholder, label, value, onChange, dataOption, dependency, formik, name, level, clearFunc, disabled } = props;
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<DanhMucDiaChiDTO[]>([]);

    const loading = open && options.length === 1;

    const [currentVal, setCurrentVal] = React.useState<DanhMucDiaChiDTO | null | undefined>(null);

    React.useEffect(() => {
        setCurrentVal(value);
    }, [value]);

    React.useEffect(() => {
        if (dataOption) {
            setOptions([...dataOption, { name: "", code: "" }]);
        }
    }, [dataOption]);

    React.useEffect(() => {
        if (!loading) {
            return undefined;
        }
        (async () => {
            if (dependency && dependency.code && level > 1 && options && options.length === 1) {
                await new DanhMucService().getDanhMucDiaChi(String(dependency?.code)).then((resp) => {
                    setOptions(resp);
                });
            } else if (!dependency && level === 1 && options && options.length === 1) {
                await new DanhMucService().getDanhMucDiaChi("").then((resp) => {
                    setOptions(resp);
                });
            }
        })();
    }, [loading]);

    function handleChange(val: DanhMucDiaChiDTO | null) {
        setCurrentVal(val);
        if (val && onChange) {
            onChange(val);
        }
    }

    function returnOpen() {
        if (disabled) {
            return false;
        }
        return open;
    }

    return (
        <>
            <InputLabel required={required} style={{ color: Boolean(getIn(formik.errors, `${name}`)) ? "red" : "#7F7F7F" }}>
                {label}
            </InputLabel>
            <Autocomplete
                disabled={disabled}
                id={id}
                open={returnOpen()}
                value={currentVal}
                loadingText={""}
                onChange={(_e, val) => handleChange(val)}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                getOptionSelected={(option, value) => option.code === value.code}
                getOptionLabel={(option) => `${option.name}`}
                options={disabled ? [] : options}
                loading={loading}
                clearOnBlur={!currentVal}
                renderInput={(params) => {
                    return (
                        <div className="padding-top-8px" ref={params.InputProps.ref}>
                            <InputBase
                                name={id}
                                fullWidth
                                {...params.inputProps}
                                placeholder={placeholder}
                                error={Boolean(getIn(formik.errors, `${name}`))}
                                required={required}
                                endAdornment={
                                    currentVal &&
                                    currentVal.code !== "" &&
                                    !disabled && (
                                        <InputAdornment position="end" classes={classes}>
                                            <IconButton
                                                edge="end"
                                                disableRipple
                                                disableTouchRipple
                                                disableFocusRipple
                                                onClick={() => {
                                                    clearFunc();
                                                    setOpen(false);
                                                }}
                                                style={{ backgroundColor: "transparent" }}
                                            >
                                                <CloseIcon fontSize="small" color="disabled" />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            />
                            {Boolean(getIn(formik.errors, `${name}`)) && formik.errors[`${name}`] && (
                                <FormHelperText className="-error">{formik.errors[`${name}`]}</FormHelperText>
                            )}
                        </div>
                    );
                }}
            />
        </>
    );
}
