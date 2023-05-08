import { Box, Button, Grid } from "@mui/material";
import React from "react";
import FileDropzone from "../../../components/fileDropzone";
import { useDropzone } from "../../../hooks/useDropzone";
import CustomizedAccordion from "../../../components/custom/customAccordion";
import CustomInput from "../../../components/custom/customInput";
import { useForm } from "react-hook-form";
import CheckIcon from "@mui/icons-material/Check";

const QuanLyDangKyNVQS = () => {
    const { files, handleSetFiles, handleChangeStatus, handleDownloadFile, handleDeleteFile } = useDropzone();
    const {
        watch,
        setValue,
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm({});

    return (
        <Grid container sx={{ padding: "20px" }}>
            <Grid container item xs={12} sx={{ padding: "10px 10px 10px 10px" }} spacing={2}>
                <Grid item xs={6}>
                    <CustomInput title="Họ và tên" errors={{}} register={register} name="name" />
                </Grid>

                <Grid item xs={6}>
                    <CustomInput title="Ngày tháng năm sinh" errors={{}} register={register} name="year" />
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{ padding: "10px 10px 10px 10px" }} spacing={2}>
                <Grid item xs={6}>
                    <CustomInput title="Họ và tên" errors={{}} register={register} name="name" />
                </Grid>

                <Grid item xs={6}>
                    <CustomInput title="Ngày tháng năm sinh" errors={{}} register={register} name="year" />
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{ padding: "10px 10px 10px 10px" }} spacing={2}>
                <Grid item xs={6}>
                    <CustomInput title="Họ và tên" errors={{}} register={register} name="name" />
                </Grid>

                <Grid item xs={6}>
                    <CustomInput title="Ngày tháng năm sinh" errors={{}} register={register} name="year" />
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{ padding: "10px 10px 20px 10px" }} spacing={2}>
                <Grid item xs={6}>
                    <CustomInput title="Họ và tên" errors={{}} register={register} name="name" />
                </Grid>

                <Grid item xs={6}>
                    <CustomInput title="Ngày tháng năm sinh" errors={{}} register={register} name="year" />
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

            <Grid xs={12} item>
                <Button
                    disableElevation
                    onClick={() => {}}
                    style={{
                        background: "green",
                        color: "#FFF",
                        textTransform: "none",
                        width: "100px",
                        height: "100%",
                        boxShadow: "0px 1px 5px 0px #3b4d8f",
                        marginRight: "10px",
                        marginTop: "20px",
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
                        Lưu
                    </Box>
                </Button>
            </Grid>
        </Grid>
    );
};

export default QuanLyDangKyNVQS;
