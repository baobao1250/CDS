import {
    Box,
    Checkbox,
    createStyles,
    DialogContent,
    FormHelperText,
    Grid,
    InputBase,
    InputLabel,
    makeStyles,
    NativeSelect,
    TextField,
    Theme,
} from "@mui/material";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React, { useEffect, useState } from "react";
import { DialogTitle } from "../../../components/commons/dialog/dialogCommons";
import { DanhMucQuyDTO, dataDMQuy } from "../../../models/interace";
import { log } from "console";
import { DanhSachCaNhanDTO } from "../../../models/danhsachcanhan";
// import { DialogTitle } from "@material-ui/core";

interface IModalProps {
    onDialogClose: () => void;
    openDialog: boolean;
    itemEdit: DanhSachCaNhanDTO;
    onSubmitData:  (values: DanhSachCaNhanDTO) => void;
}

interface ErrorValidation {
    name: string;
    code: string;
    group: string;
}

export const DMQuyDialog = (props: IModalProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [itemEditDTO, setItemEditDTO] = useState<DanhSachCaNhanDTO>({} as DanhSachCaNhanDTO);
    const [errors, setErrors] = useState<ErrorValidation>({} as ErrorValidation);
    
    useEffect(() => {
        setItemEditDTO(props.itemEdit);
        setOpenDialog(props.openDialog);
    }, [ props.openDialog,props.itemEdit]);

    const handleChange = (e: any) => {
        const isCheckbox = e.target.type === "checkbox";
        setItemEditDTO((itemEditDTO) => ({
          ...itemEditDTO,
          [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
        }));
      };
    
 
    const submitData = () => {
        props.onSubmitData(itemEditDTO)
      };
      
      
    return (
        <>
            <Dialog  onClose={props.onDialogClose} fullWidth maxWidth="md" aria-labelledby="customized-dialog-title"open={openDialog} >
                <DialogTitle id="customized-dialog-title" onClose={props.onDialogClose}>
                    {itemEditDTO.id !== null ? "Thêm mới danh sách" : "Cập nhật danh sách"}
                </DialogTitle>
                <DialogContent dividers>
                <Box padding={0}>
                        <Grid spacing={2} container>
                            <Grid item xs={6} className="gridItem">
                                <InputLabel>Mã </InputLabel>
                                <TextField
                                    fullWidth
                                    label={""}
                                    required
                                    name="code"
                                    value={itemEditDTO.code}
                                    onChange={handleChange}
                                    error={Boolean(errors.name)}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    FormHelperTextProps={{ className: "-error" }}
                                    helperText={Boolean(errors.name) && errors.name}
                                />
                            </Grid>
                            <Grid item xs={6} className="gridItem">
                                 <InputLabel>Họ và tên</InputLabel>
                                <TextField
                                    fullWidth
                                    label={""}
                                    required
                                    name="name"
                                    value={itemEditDTO.name}
                                    onChange={handleChange}
                                    error={Boolean(errors.name)}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    FormHelperTextProps={{ className: "-error" }}
                                    helperText={Boolean(errors.code) && errors.code}
                                />
                            </Grid>
                            <Grid item xs={6} className="gridItem">
                                <InputLabel>Số tiền nộp</InputLabel>
                                <TextField
                                    fullWidth
                                    label={""}
                                    required
                                    name="sotien"
                                    value={itemEditDTO.sotien}
                                    onChange={handleChange}
                                    error={Boolean(errors.name)}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    FormHelperTextProps={{ className: "-error" }}
                                    helperText={Boolean(errors.name) && errors.name}
                                />
                            </Grid>
                           
                            <Grid item xs={12} className="gridItem">
                                <InputLabel>Số điện thoại</InputLabel>
                                <TextField
                                    fullWidth
                                    label={""}
                                    required
                                    name="sdt"
                                    value={itemEditDTO.sdt}
                                    onChange={handleChange}
                                    error={Boolean(errors.name)}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    FormHelperTextProps={{ className: "-error" }}
                                    helperText={Boolean(errors.name) && errors.name}
                                />
                            </Grid>
                           
                            <Grid item xs={12} className="gridItem">
                                <Box marginTop="5px">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        onClick={() => {
                                            // props.onSubmitData();
                                             submitData();
                                            
                                             
                                        }}
                                    >
                                        Lưu
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        disableElevation
                                    >
                                        Xóa
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="default"
                                        disableElevation
                                        onClick={props.onDialogClose}
                                    >
                                        Hủy
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
 }