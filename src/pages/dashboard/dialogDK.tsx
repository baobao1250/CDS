import {
    Box,
    Checkbox,
    DialogContent,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    InputBase,
    InputLabel,   
    NativeSelect,   
    Radio,   
    RadioGroup,
    TextField,
} from "@mui/material";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React, { useEffect, useState } from "react";
import {  DanhSachCongDanDTO, dataDSCD } from "../../models/dsCongDan";
import { DialogTitle } from "../../components/commons/dialog/dialogCommons";
import { DanhMucQuyDTO, dataDMQuy } from "../../models/interace";


interface IModalProps {
    onDialogClose: () => void;
    openDialog: boolean;
    itemEdit: DanhSachCongDanDTO;
     onSubmitData:  (values:DanhSachCongDanDTO ) => void;
}

interface ErrorValidation {
    name: string;
    code: string;
    group: string;
}
export const DKiDongQuy = (props: IModalProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [itemEditDTO, setItemEditDTO] = useState<DanhSachCongDanDTO>({} as DanhSachCongDanDTO);
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

      const handleClick = () => () => {
        props.onSubmitData(itemEditDTO)
      };

  // const submitData = () => {
    //     // setDataQuy([...dataQuy,itemEditDTO ])
    //     props.onSubmitData(itemEditDTO)
    //   };
      
   
      
    return (
        <>
            <Dialog  onClose={props.onDialogClose} fullWidth maxWidth="md" aria-labelledby="customized-dialog-title"open={openDialog} >
                <DialogTitle id="customized-dialog-title" onClose={props.onDialogClose}>
                  ĐĂNG KÝ ĐÓNG QUỶ
                </DialogTitle>
                <DialogContent dividers>
                <Box padding={0}>
                        <Grid spacing={2} container>
                            <Grid item xs={6} className="gridItem">
                                <InputLabel>CCCD</InputLabel>
                                <TextField
                                    fullWidth
                                    disabled
                                    label={""}
                                    required
                                    name="cccd"
                                    value={itemEditDTO.cccd}
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
                                 <InputLabel>Tên công dân</InputLabel>
                                <TextField
                                    fullWidth
                                    disabled
                                    label={""}
                                    required
                                    name="name"
                                    value={itemEditDTO.name}
                                    onChange={handleChange}
                                    error={Boolean(errors.code)}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    FormHelperTextProps={{ className: "-error" }}
                                    helperText={Boolean(errors.code) && errors.code}
                                />
                            </Grid>
                            <Grid item xs={6} className="gridItem">
                                <InputLabel>gmail</InputLabel>
                                <TextField
                                    fullWidth
                                    disabled
                                    label={""}
                                    required
                                    name="gmail"
                                    value={itemEditDTO.gmail}
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
                                <InputLabel>sdt</InputLabel>
                                <TextField
                                    fullWidth
                                    color='info'
                                    disabled
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
                            <Grid item xs={6} className="gridItem">
                            <FormControl sx={{ m: 1, width: 400 }}>
                            <FormLabel id="demo-row-radio-buttons-group-label">Chọn quỷ</FormLabel>
                                <NativeSelect 
                                    id="name"
                                    error={Boolean(errors.group)}
                                   
                                    onChange={handleChange}
                                >
                                    {dataDMQuy.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </NativeSelect>
                            </ FormControl>
                                {Boolean(errors.group) && <FormHelperText className="-error">{errors.group}</FormHelperText>}
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Thanh Toán</FormLabel>
                                <Box marginTop={"15px"} marginLeft={"20px"} >
                                    <RadioGroup
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    
                                >
                                    <FormControlLabel value="ví điện tử Foxpay"  control={<Radio size="small" />} label=" ví điện tử Foxpay" />
                                    <FormControlLabel value="Ngân hàng" control={<Radio size="small" />} label="Ngân hàng" />
                                   
                                   
                                </RadioGroup>
                                </Box>
                                
                            </FormControl>
                            </Grid>
                            <Grid item xs={12} className="gridItem">
                                <InputLabel>Địa chỉ</InputLabel>
                                <TextField
                                    fullWidth
                                    label={""}
                                    required
                                    name="diachi"
                                    value={itemEditDTO.diachi}
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
                                        onClick={
                                            handleClick()
                                        }
                                    >
                                        Đăng ký
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