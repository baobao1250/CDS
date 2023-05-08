import { InputBase, InputLabel, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { getIn } from "formik";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FieldGeneral } from "../Interface";

export interface CustomInputDebounceProps {}

export interface OptionAutoComplete {
    giayPhepId: Number | null;
    soGiayPhep: String;
    hoSoThuLyId: Number | null;
}

type CustomInputDebounce<T, K> = Pick<
    FieldGeneral<T, K>,
    "formik" | "label" | "nameObject" | "name" | "required" | "referenceFieldName" | "disabled" | "InputProps" | "handleChangeOveride"
>;

const CustomInputDebounce = <T extends { [key: string]: any }, K extends object>({
    formik,
    label,
    name,
    nameObject,
    required = false,
    referenceFieldName,
    disabled = false,
    InputProps,
    handleChangeOveride,
}: CustomInputDebounce<T, K>) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<OptionAutoComplete[]>([]);
    const [keyWord, setKeyWord] = useState<String>("");
    const [currentValue, setCurrentvalue] = useState<OptionAutoComplete>();
    const loading = open && options.length === 0;
    const typingRef = useRef<any>(null);

    useEffect(() => {
        // async function getOption() {
        //     const data = await (handleChangeOveride && handleChangeOveride(""));
        //     if (data) {
        //         setOptions(data);
        //     }
        // }
        // getOption();
    }, []);

    useEffect(() => {
        if (nameObject && formik && formik.values[nameObject.split(".")[0]][nameObject.split(".")[1]] === "") {
            setCurrentvalue(undefined);
            setKeyWord("");
            return;
        }

        if (formik && formik.values[`${name}`] === "") {
            setCurrentvalue(undefined);
            setKeyWord("");
        }
    }, [formik && formik.values[`${name}`], formik && nameObject && formik.values[nameObject.split(".")[0]][nameObject.split(".")[1]]]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setKeyWord(value);
        if (typingRef.current) {
            clearTimeout(typingRef.current);
        }
        typingRef.current = setTimeout(() => {
            const exist = options.find((item) => item.soGiayPhep === e.target.value);
            if (!exist) {
                setCurrentvalue(undefined);
                formik && formik.setFieldValue && formik.setFieldValue(`${nameObject ? nameObject : name}`, e.target.value);
                formik?.setFieldError(`${nameObject ? nameObject : name}`, "Số giấy phép không tồn tại");
            } else {
                formik?.setFieldError(`${nameObject ? nameObject : name}`, "");
            }
        }, 500);
    }

    async function handleSearch(keywords: String) {
        try {
            // const data = await (handleChangeOveride && handleChangeOveride(keywords));
            // if (data) {
            //     setOptions(data);
            // }
        } catch (error) {}
    }

    function returnOpen() {
        if (disabled) {
            return false;
        }
        return open;
    }

    function handleSetValue() {
        if (options.length > 0) {
            setCurrentvalue(options[0]);
        }
    }

    useEffect(() => {
        if (formik && nameObject && formik.values[nameObject.split(".")[0]][nameObject.split(".")[1]]) {
            setKeyWord(formik?.values[nameObject.split(".")[0]][nameObject.split(".")[1]]);
            setCurrentvalue(options.find((item) => item.soGiayPhep === formik?.values[nameObject.split(".")[0]][nameObject.split(".")[1]]));
            return;
        }
        if (formik && name && formik.values[`${name}`]) {
            setKeyWord(formik?.values[`${name}`]);
            setCurrentvalue(options.find((item) => item.soGiayPhep === formik?.values[`${nameObject ? nameObject : name}`]));
        }
    }, [formik && formik.values[`${name}`], formik && nameObject && formik.values[nameObject.split(".")[0]][nameObject.split(".")[1]]]);

    function handleChangeAutocomplete(e: any, val: OptionAutoComplete | null) {
        if (val) {
            setCurrentvalue(val);
            formik && formik.setFieldValue && formik.setFieldValue(`${nameObject ? nameObject : name}`, val.soGiayPhep);
            formik && formik.setFieldValue && formik.setFieldValue(`${referenceFieldName}`, val.hoSoThuLyId);
            formik?.setFieldError(`${nameObject ? nameObject : name}`, "");
        } else {
            setCurrentvalue(undefined);
            formik && formik.setFieldValue && formik.setFieldValue(`${nameObject ? nameObject : name}`, "");
        }
    }

    return (
        <>
            <InputLabel required={required} style={{ color: Boolean(getIn(formik && formik.errors, `${nameObject ? nameObject : name}`)) ? "red" : "#7F7F7F" }}>
                {label}
            </InputLabel>
            <Autocomplete
                disabled={disabled}
                open={returnOpen()}
                inputValue={`${keyWord && keyWord}`}
                loadingText={options.length > 0 ? "Loading..." : "Không có dữ liệu"}
                noOptionsText="Không tồn tại"
                value={currentValue ? currentValue : ({ giayPhepId: null, soGiayPhep: "", hoSoThuLyId: null } as OptionAutoComplete)}
                loading={loading}
                clearOnBlur={!currentValue}
                onChange={handleChangeAutocomplete}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                getOptionSelected={(option, value) => option.hoSoThuLyId === value.hoSoThuLyId}
                getOptionLabel={(option) => `${option.soGiayPhep}`}
                options={disabled ? [] : options}
                renderInput={(params) => {
                    return (
                        <div className="padding-top-8px" ref={params.InputProps.ref}>
                            <TextField
                                {...params}
                                onChange={handleChange}
                                error={Boolean(getIn(formik && formik.errors, `${nameObject ? nameObject : name}`))}
                                required={required}
                                InputProps={{
                                    disableUnderline: true,
                                    inputComponent: () => <InputBase />,
                                    ...InputProps,
                                }}
                                FormHelperTextProps={{ className: "-error" }}
                                helperText={
                                    nameObject
                                        ? Boolean(getIn(formik && formik.errors, `${nameObject}`)) &&
                                          formik &&
                                          formik.errors[`${nameObject?.split(".")[0]}`][`${nameObject?.split(".")[1]}`]
                                        : Boolean(getIn(formik && formik.touched, `${name}`) && getIn(formik && formik.errors, `${name}`)) &&
                                          formik &&
                                          formik.errors[`${name}`]
                                }
                            />
                        </div>
                    );
                }}
            />
        </>
    );
};

export default CustomInputDebounce;
