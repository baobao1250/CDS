import { Grid, GridSize, InputLabel } from "@material-ui/core";
import React from "react";
import { FieldGeneral, FormikType } from "./Interface";

export interface CreateFieldsProps<T, K> extends FieldGeneral<T, K> {
    Component?: React.ElementType;
    xs?: GridSize;
    ResetUI?: boolean;
}

export interface ArrField<T, K> {
    fields: CreateFieldsProps<T, K>[];
    formik: FormikType<T>;
}

export interface OptionDefault {
    title?: string;
    value?: string | number | boolean;
    id?: string;
    name?: string;
    valueField?: string;
    data?: any[];

}



const CreateFields = <T extends object, K extends object>({ fields, formik }: ArrField<T, K>) => {
    // console.log("fields",fields);
    return (
        <>
            {fields.map(({ Component, label, name, style, xs, ResetUI, ...rest }, index) => {
                let dataRow: any = style;
                let stylenew: React.CSSProperties = ({} as React.CSSProperties)
                if (dataRow) {
                    stylenew = dataRow["style"]
                        ? (dataRow["style"] as React.CSSProperties)
                        : ({} as React.CSSProperties);   
                }
                if (!xs) {
                    return null;
                }
                if (rest.enableDiaChi) {
                    return Component && <Component key={index} {...rest} formik={formik} label={label} name={name} />;
                }
                if (label && !Component) {
                    return (
                        <Grid item xs={xs} className="grid-item" key={index} style={{ alignSelf: "center" }}>
                            <InputLabel>{label}</InputLabel>
                        </Grid>
                    );
                }
                if (!Component && !name) {
                    return (
                        <Grid item xs={xs} className="grid-item" key={index}>
                            <InputLabel>{label}</InputLabel>
                        </Grid>
                    );
                }
             
                //HienLT52 - Kaizen - style Css
                if(Component && ResetUI){
                    //console.log("ResetUI", ResetUI);
                    return (
                        <Grid item xs={xs} className="grid-item" key={index} style={{paddingLeft: "0", paddingRight: "0" }}>
                            {Component && <Component  {...rest} formik={formik} label={label} name={name} />}
                        </Grid>
                    );
                }

                return (
                    <Grid item xs={xs} className="grid-item" key={index}>
                        {Component && <Component  {...rest} formik={formik} label={label} name={name} />}
                    </Grid>
                );
            })}
        </>
    );
};

export default CreateFields;
