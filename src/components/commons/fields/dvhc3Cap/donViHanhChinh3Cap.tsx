import { Grid, GridSize, InputBaseProps, InputClassKey, StandardProps, TextField } from "@material-ui/core";
import { DanhMucService } from "apis/danhMuc/danhMucService";
import { DanhMucDiaChiDTO } from "models/danhMuc/danhMucDTO";
import React, { useEffect, useState } from "react";
import Asynchronous from "./asynchronousAutoComplete";

export interface DiaChiDonViHanhChinhPropsI {
    formik: any;
    required?: boolean;
    InputProps?: Partial<StandardProps<InputBaseProps, InputClassKey>>;
    disabled?: boolean;
    hideTinhThanh?: boolean;
    hideQuanHuyen?: boolean;
    hidePhuongXa?: boolean;
    xs?: GridSize;
}

export const DiaChiDonViHanhChinh = (props: DiaChiDonViHanhChinhPropsI) => {
    const { formik, required = true, disabled = false, hidePhuongXa = false, hideQuanHuyen = false, hideTinhThanh = false, xs = 3 } = props;

    const [tinhSelected, setTinhSelected] = useState<DanhMucDiaChiDTO | null | undefined>({ code: "", name: "" } as DanhMucDiaChiDTO);
    const [huyenSelected, setHuyenSelected] = useState<DanhMucDiaChiDTO | null | undefined>({ code: "", name: "" } as DanhMucDiaChiDTO);
    const [xaSelected, setXaSelected] = useState<DanhMucDiaChiDTO | null | undefined>({ code: "", name: "" } as DanhMucDiaChiDTO);
    // const [duongSelected, setDuongSelected] = useState<DanhMucDiaChiDTO | null | undefined>({ code: "", name: "" } as DanhMucDiaChiDTO);

    const [dataTinhThanh] = useState<DanhMucDiaChiDTO[]>([]);
    const [dataQuanHuyen, setDataQuanHuyen] = useState<DanhMucDiaChiDTO[]>([]);
    const [dataXaPhuong, setDataXaPhuong] = useState<DanhMucDiaChiDTO[]>([]);
    // const [dataDuong, setDataDuong] = useState<DanhMucDiaChiDTO[]>([]);

    // useEffect(() => {
    //     if (disabled || hideTinhThanh) {
    //         formik.setFieldValue(`tenTinhThanh`, "Thành phố Cần Thơ");
    //         formik.setFieldValue(`maTinhThanh`, "92");
    //     }
    //     async function getDm() {
    //         if (disabled) {
    //             await new DanhMucService().getDanhMucDiaChi(String(92)).then((resp) => {
    //                 setDataQuanHuyen(resp);
    //                 setDataXaPhuong([]);
    //             });
    //         }
    //     }
    //     getDm();
    // }, []);

    useEffect(() => {
        formik.values["maTinhThanh"]
            ? setTinhSelected({ name: formik.values["tenTinhThanh"], code: formik.values["maTinhThanh"] })
            : setTinhSelected({ name: "", code: "" });
        formik.values["maQuanHuyen"]
            ? setHuyenSelected({ name: formik.values["tenQuanHuyen"], code: formik.values["maQuanHuyen"] })
            : setHuyenSelected({ name: "", code: "" });
        formik.values["maPhuongXa"]
            ? setXaSelected({ name: formik.values["tenPhuongXa"], code: formik.values["maPhuongXa"] })
            : setXaSelected({ name: "", code: "" });
    }, [formik.values]);

    async function handleChangeTinhThanh(item: DanhMucDiaChiDTO) {
        formik.setFieldValue(`tenTinhThanh`, item.name);
        formik.setFieldValue(`maTinhThanh`, item.code);
        formik.setFieldValue(`tenQuanHuyen`, "");
        formik.setFieldValue(`maQuanHuyen`, "");
        formik.setFieldValue(`tenPhuongXa`, "");
        formik.setFieldValue(`maPhuongXa`, "");
        // formik.setFieldValue(`maDuong`, "");
        // formik.setFieldValue(`tenDuong`, "");

        await new DanhMucService().getDanhMucDiaChi(String(item.code)).then((resp) => {
            setDataQuanHuyen(resp);
            setDataXaPhuong([]);
        });
    }

    async function handleChangeQuanHuyen(item: DanhMucDiaChiDTO) {
        formik.setFieldValue(`tenQuanHuyen`, item.name);
        formik.setFieldValue(`maQuanHuyen`, item.code);
        formik.setFieldValue(`maPhuongXa`, "");
        formik.setFieldValue(`tenPhuongXa`, "");
        // formik.setFieldValue(`maDuong`, "");
        // formik.setFieldValue(`tenDuong`, "");
        await new DanhMucService().getDanhMucDiaChi(String(item.code)).then((resp) => {
            setDataXaPhuong(resp);
        });
    }

    async function handleChangeXaPhuong(item: DanhMucDiaChiDTO) {
        formik.setFieldValue(`tenPhuongXa`, item.name);
        formik.setFieldValue(`maPhuongXa`, item.code);
        // formik.setFieldValue(`maDuong`, "");
        // formik.setFieldValue(`tenDuong`, "");
        // await new DanhMucService().getDanhMucDiaChi(String(item.code)).then((resp) => {
        //     setDataDuong(resp);
        // });
    }

    // async function handleChangeDuong(item: DanhMucDiaChiDTO) {
    //     formik.setFieldValue(`maDuong`, item.code);
    //     formik.setFieldValue(`tenDuong`, item.code);
    // }

    function clearTinh() {
        formik.setFieldValue(`tenTinhThanh`, "");
        formik.setFieldValue(`maTinhThanh`, "");
        formik.setFieldValue(`tenQuanHuyen`, "");
        formik.setFieldValue(`maQuanHuyen`, "");
        formik.setFieldValue(`maPhuongXa`, "");
        formik.setFieldValue(`tenPhuongXa`, "");
        // formik.setFieldValue(`maDuong`, "");
        // formik.setFieldValue(`tenDuong`, "");
        setDataQuanHuyen([]);
        setDataXaPhuong([]);
        // setDataDuong([]);
    }

    function clearHuyen() {
        formik.setFieldValue(`tenQuanHuyen`, "");
        formik.setFieldValue(`maQuanHuyen`, "");
        formik.setFieldValue(`maPhuongXa`, "");
        formik.setFieldValue(`tenPhuongXa`, "");
        // formik.setFieldValue(`maDuong`, "");
        // formik.setFieldValue(`tenDuong`, "");
        setDataXaPhuong([]);
        // setDataDuong([]);
    }

    function clearXa() {
        formik.setFieldValue(`maPhuongXa`, "");
        formik.setFieldValue(`tenPhuongXa`, "");
        // formik.setFieldValue(`maDuong`, "");
        // formik.setFieldValue(`tenDuong`, "");
        // setDataDuong([]);
    }

    // function clearDuong() {
    //     formik.setFieldValue(`maDuong`, "");
    //     formik.setFieldValue(`tenDuong`, "");
    // }

    return (
        <>
            {!hideTinhThanh && (
                <Grid item xs={4} className="grid-item">
                    <Asynchronous
                        id={`tinh-comc`}
                        label="Tỉnh/Thành phố"
                        placeholder="-- Chọn tỉnh thành --"
                        disabled={disabled}
                        name="maTinhThanh"
                        value={tinhSelected}
                        dataOption={dataTinhThanh}
                        required={required}
                        level={1}
                        onChange={(item) => handleChangeTinhThanh(item)}
                        formik={formik}
                        clearFunc={clearTinh}
                    />
                </Grid>
            )}
            {!hideQuanHuyen && (
                <Grid item xs={4} className="grid-item">
                    <Asynchronous
                        id={`huyen-comc`}
                        label="Huyện/Thị/TP"
                        placeholder="-- Chọn Quận/Huyện --"
                        name="maQuanHuyen"
                        disabled={disabled}
                        value={huyenSelected}
                        dataOption={dataQuanHuyen}
                        required={required}
                        level={2}
                        onChange={(item) => handleChangeQuanHuyen(item)}
                        dependency={tinhSelected}
                        formik={formik}
                        clearFunc={clearHuyen}
                    />
                </Grid>
            )}
            {!hidePhuongXa && (
                <Grid item xs={4} className="grid-item">
                    <Asynchronous
                        id={`xa-comc`}
                        name="maPhuongXa"
                        label="Phường/Xã/TT"
                        placeholder="-- Chọn Phường/Xã/TT --"
                        value={xaSelected}
                        disabled={disabled}
                        required={required}
                        level={3}
                        dataOption={dataXaPhuong}
                        onChange={(item) => handleChangeXaPhuong(item)}
                        dependency={huyenSelected}
                        formik={formik}
                        clearFunc={clearXa}
                    />
                </Grid>
            )}
            <Grid item xs={12} className="grid-item">
                <TextField
                    fullWidth
                    label={"Số nhà, đường"}
                    name={`soNhaDuong`}
                    disabled={disabled}
                    value={formik.values && formik.values["soNhaDuong"]}
                    onChange={formik.handleChange}
                    InputProps={{ disableUnderline: true, ...props.InputProps }}
                />
            </Grid>
        </>
    );
};
