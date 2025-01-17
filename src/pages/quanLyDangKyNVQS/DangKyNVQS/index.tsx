import { Box, Button, Grid } from "@mui/material";
import React from "react";
import FileDropzone from "../../../components/fileDropzone";
import { useDropzone } from "../../../hooks/useDropzone";
import CustomizedAccordion from "../../../components/custom/customAccordion";
import CustomInput from "../../../components/custom/customInput";
import CheckIcon from "@mui/icons-material/Check";
import { CustomInputLabel } from "../../../components/custom/customInputLabel";
import CustomSelect from "../../../components/custom/customSelect";
import CustomDatePicker from "../../../components/custom/customDatePicker";
import { DangKyNVQSContext, initData } from "./dangKyNVQSInterface";
import { useForm } from "react-hook-form";

const QuanLyDangKyNVQS = () => {
    const { files, handleSetFiles, handleChangeStatus, handleDownloadFile, handleDeleteFile } = useDropzone();

    const { handleChangePage, handleSave } = React.useContext(DangKyNVQSContext);
    const {
        watch,
        setValue,
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: { ...initData },
    });

    return (
        <Grid container sx={{ padding: "20px" }}>
            <Grid container item xs={12} sx={{ padding: "10px 10px 10px 10px" }} spacing={2}>
                <Grid item xs={12} md={6}>
                    <CustomInput title="Họ và tên" errors={{}} register={register} name="name" />
                </Grid>

                <Grid item md={4} xs={8}>
                    <CustomDatePicker
                        name={"ngaySinh"}
                        backgroundColor="white"
                        title={"Ngày tháng năm sinh"}
                        value={watch ? watch("ngaySinh") : null}
                        setValue={setValue}
                        register={register}
                        errors={errors}
                    />
                </Grid>
                <Grid item md={2} xs={4}>
                    <CustomSelect
                        title="Giới tính"
                        errors={{}}
                        name={`gioiTinh`}
                        value={watch("gioiTinh")}
                        options={[
                            { value: "1", title: "nam" },
                            { value: "2", title: "Nữ" },
                            { value: "3", title: "khác" },
                        ]}
                        setValue={setValue}
                    />
                </Grid>
            </Grid>

            <Grid container item xs={12} sx={{ padding: "10px 10px 20px 10px" }} spacing={2}>
                <Grid item xs={12} md={6}>
                    <CustomInput title="Nơi sinh" errors={{}} register={register} name="noiSinh" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomInput title="Địa chỉ" errors={{}} register={register} name="diaChi" />
                </Grid>
            </Grid>

            <Grid xs={12} item>
                <CustomizedAccordion title={"Tài liệu đính kèm"}>
                    <Grid xs={12} item>
                        <FileDropzone
                            attachedFiles={files}
                            handleChangeStatus={handleChangeStatus}
                            handleDownloadFile={handleDownloadFile}
                            handleDeleteFile={handleDeleteFile}
                        />
                    </Grid>
                </CustomizedAccordion>
            </Grid>

            <Grid xs={12} item container justifyContent="flex-end">
                <Button
                    disableElevation
                    onClick={handleChangePage}
                    style={{
                        background: "gray",
                        color: "#FFF",
                        textTransform: "none",
                        width: "100px",
                        height: "100%",
                        boxShadow: "0px 1px 5px 0px #3b4d8f",
                        marginRight: "10px",
                        marginTop: "10px",
                    }}
                >
                    <CheckIcon style={{ color: "#FFF", marginRight: 10, fontSize: 19 }} />
                    <Box
                        component="span"
                        fontSize="14px"
                        fontFamily="Roboto"
                        fontWeight="500"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        overflow="hidden"
                    >
                        trở về
                    </Box>
                </Button>
                <Button
                    disableElevation
                    onClick={handleSubmit(handleSave)}
                    style={{
                        background: "green",
                        color: "#FFF",
                        textTransform: "none",
                        width: "100px",
                        height: "100%",
                        boxShadow: "0px 1px 5px 0px #3b4d8f",
                        marginRight: "10px",
                        marginTop: "10px",
                    }}
                >
                    <CheckIcon style={{ color: "#FFF", fontSize: 19 }} />
                    <Box
                        component="span"
                        fontSize="14px"
                        fontFamily="Roboto"
                        fontWeight="500"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        overflow="hidden"
                    >
                        Lưu
                    </Box>
                </Button>
            </Grid>
        </Grid>
    );
};

export default QuanLyDangKyNVQS;
