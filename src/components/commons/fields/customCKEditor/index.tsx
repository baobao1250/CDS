import { FormHelperText, InputLabel } from "@material-ui/core";
import { getIn } from "formik";
import React from "react";
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css"; // ES6
import { FieldGeneral } from "../Interface";
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);


type CustomCKEditor<T, K extends object> = Pick<FieldGeneral<T, K>, "name" | "formik" | "label" | "required" | "nameObject">;

const CustomCKEditor = <T extends { [key: string]: any }, K extends object>({ formik, name, label, required = false, nameObject }: CustomCKEditor<T, K>) => {
    return (
        <>
            <InputLabel error={Boolean(getIn(formik && formik.touched, `${name}`) && getIn(formik && formik.errors, `${name}`))} required={required}>
                {label}
            </InputLabel>
            <ReactQuill
                theme="snow"
                modules={{
                    imageResize: {
                        parchment: Quill.import('parchment'),
                        modules: ['Resize', 'DisplaySize']
                    },
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                        ["link", "image"],
                        ["clean"],
                    ],
                }}
                formats={[ "header","font","size","bold","italic","underline","strike","blockquote","list","bullet","indent","link","image","video","alt","height","width","style","size",]}
                value={formik && name && formik.values[name]}
                onChange={(e) => {
                    formik && formik.setFieldValue && formik.setFieldValue(`${nameObject ? nameObject : name}`, e);
                }}
            />

            {Boolean(getIn(formik && formik.touched, `${name}`) && getIn(formik && formik.errors, `${name}`)) && (
                <FormHelperText className="-error">{formik && name && formik.errors[name]}</FormHelperText>
            )}
        </>
    );
};

export default CustomCKEditor;
