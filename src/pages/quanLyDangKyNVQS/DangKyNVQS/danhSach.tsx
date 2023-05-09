import React, { ReactElement, useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    Collapse,
    Grid,
    IconButton,
    InputBase,
    InputLabel,
    NativeSelect,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Cell } from "../../../components/commons/table/tableCommons";
import { TableCell } from "@material-ui/core";
import { DangKyNVQSContext } from "./dangKyNVQSInterface";
import moment from "moment";
import CustomInput from "../../../components/custom/customInput";
import { useForm } from "react-hook-form";

const TinhTrangXuLy = () => {
    const { data, handleChangePage, handleSearch } = React.useContext(DangKyNVQSContext);

    const {
        watch,
        setValue,
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm({});

    useEffect(() => {
        handleSearch(watch("name"));
    }, [watch("name")]);

    return (
        <Grid container item xs={12} margin={2}>
            <Grid container item sx={{ paddingBottom: "10px" }}>
                <Grid item xs={8}>
                    <CustomInput placeholder="Nhập họ và tên" errors={{}} register={register} name="name" />
                </Grid>
                <Grid item xs={4} className="grid-item" justifyContent="flex-end">
                    <Box justifyContent="flex-end" display="flex">
                        <Button
                            variant="contained"
                            style={{ backgroundColor: "#5fba63", color: "#fff", width: 200 }}
                            onClick={() => {
                                handleChangePage();
                            }}
                        >
                            <Box
                                component="span"
                                fontSize="14px"
                                fontFamily="Roboto"
                                fontWeight="500"
                                whiteSpace="nowrap"
                                textOverflow="ellipsis"
                                overflow="hidden"
                            >
                                Thêm mới
                            </Box>
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table aria-label="customized table" size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" className="bold-cell" scope="row" align="center" width="5%">
                                Họ và tên
                            </TableCell>
                            <Cell component="th" scope="row" align="center" width="15%">
                                Ngày sinh
                            </Cell>

                            <Cell component="th" scope="row" align="center" width="10%">
                                Nơi sinh
                            </Cell>
                            <Cell component="th" scope="row" align="center" width="15%">
                                Địa chỉ
                            </Cell>
                            <Cell component="th" scope="row" align="center" width="20%">
                                Trạng thái
                            </Cell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((row, i) => (
                                <TableRow key={i}>
                                    <Cell scope="row" align="center">
                                        {row.name}
                                    </Cell>
                                    <Cell align="center">{moment(row.ngaySinh).format("DD/MM/YYYY")}</Cell>
                                    <Cell align="center">{row.noiSinh}</Cell>
                                    <Cell align="center">{row.diaChi}</Cell>
                                    <Cell align="center">Đã gửi</Cell>
                                </TableRow>
                            ))
                        ) : (
                            <Cell colSpan={6} style={{ border: "1px solid #dedddd", textAlign: "center" }}>
                                Không có dữ liệu
                            </Cell>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
};

export default TinhTrangXuLy;
