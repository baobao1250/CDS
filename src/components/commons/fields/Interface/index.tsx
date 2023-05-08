import { InputBaseProps, InputClassKey, StandardProps } from "@material-ui/core";
import { FormikErrors, FormikTouched } from "formik";
import { Attributes } from "react";

export interface FormikType<T> {
    handleChange: {
        (e: React.ChangeEvent<any>): void;
    };
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<FormikErrors<T>> | Promise<void>;
    values: T;
    errors: any;
    touched: FormikTouched<T>;
    setFieldError: (field: string, message: string | undefined) => void;
}

export type typeK<T> = keyof T;

export interface FieldGeneral<T, K> {
    name?: keyof T;
    nameObject?: string;
    placeholder?: string;
    label?: String;
    required?: boolean;
    disabled?: boolean;
    formik?: FormikType<T>;
    type?: "text" | "number" | "currency" | "password";
    // Date overide 2 field Str | Date
    names?: typeK<T>[];

    // Textfield
    InputProps?: Partial<StandardProps<InputBaseProps, InputClassKey>>;

    // Input Debounce
    handleChangeOveride?: (values: any, name?: string, checked?: boolean) => void;
    referenceFieldName?: keyof T;
    // Select
    options?: K[];
    fieldValue?: keyof K;
    fieldString?: keyof K;

    // Field Async DVHC
    enableDiaChi?: boolean;
    hideTinhThanh?: boolean;
    hideQuanHuyen?: boolean;
    hidePhuongXa?: boolean;

    // Rest
    props?: (Attributes & T & K) | null;

    handleDrop?: (e: any, name: keyof T) => void;
    handleBlur?: (value: string) => void;
    max?: number;
    style?: any;

    // router autocomplete values
    getValue?: boolean;
    checkAutoComplate?: boolean;
    autocomplete?: "off";
}
