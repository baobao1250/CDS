

import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Box, Button, Grid, InputLabel, Paper, TextField, Typography, styled } from '@mui/material';
import Logo from '../../assets/logo.jpg'
import { DKiDongQuy } from './dialogDK';
import { DanhSachCongDanDTO,dataDSCD } from '../../models/dsCongDan';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode !== 'dark' ? 'whitesmoke' : '#fff',
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface ErrorValidation {
  name: string;
  code: string;
  group: string;
}

const ThongKe: FC = (): ReactElement => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<DanhSachCongDanDTO>({} as DanhSachCongDanDTO);
  const [danhSachCD, setDanhSachCD] =useState<DanhSachCongDanDTO>({} as DanhSachCongDanDTO);
  const [errors, setErrors] = useState<ErrorValidation>({} as ErrorValidation);

  const closeDialog = async () => {
    await setOpenDialog(false);
    setItemSelected({} as DanhSachCongDanDTO);
};
const handleChange = (e: any) => {
  const isCheckbox = e.target.type === "checkbox";
  setDanhSachCD((danhSachCD) => ({
    ...danhSachCD,
    [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
  }));
};

const handleSubmitData =  () => {
  setOpenDialog(false);
  setItemSelected({} as DanhSachCongDanDTO);
 
};

useEffect(() => {
      
      const congDan = dataDSCD.find(dataDSCD => dataDSCD.cccd === danhSachCD.cccd)
      if(congDan)
      setDanhSachCD(congDan)
}, [danhSachCD]);



  return (
    <>
      <Grid container spacing={2} >
        <Grid item xs={10} sm={10} md={12} lg={12}>
          <Item sx={{ height: "500px" }}>
            <Grid display={'flex'} justifyContent={'center'} marginTop={"20px"}>
              <img src={Logo} alt="Logo" width={"70px"} height={"70px"} />
            </Grid>
            <Grid display={'flex'} justifyContent={'center'} marginTop={"20px"}>

              <Typography display={'flex'} variant='h4' color={'#003366'} >QUỶ TỪ THIỆN CÔNG ĐỒNG</Typography>
            </Grid>


            <Grid item xs={12} className="gridItem" marginTop={"80px"}>
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                }}
                display={"inline-block"}
              >
                <InputLabel >Nhập CCCD</InputLabel>
                <TextField
                  fullWidth
                  label={""}
                  required
                  name="cccd"
                  value={danhSachCD.cccd}
                  onChange={handleChange}
                  error={Boolean(errors.name)}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  FormHelperTextProps={{ className: "-error" }}
                  helperText={Boolean(errors.name) && errors.name}
                />
              </Box>

            </Grid>

            <Grid item xs={12} className="gridItem" margin={"30px"}>
              <Box marginTop="5px">
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={() => {
                    setOpenDialog(true);
                    setItemSelected(danhSachCD);
                }}
                >
                  Nhập
                </Button>
              </Box>
            </Grid>

          </Item>
        </Grid>

        <Paper component="div">
                {openDialog && (
                    <DKiDongQuy 
                        openDialog={openDialog}
                        onDialogClose={closeDialog}   
                        itemEdit={itemSelected}  
                        onSubmitData={handleSubmitData}  
                    />
                )}
            </Paper>
      </Grid>
    </>
  );
}

export default ThongKe;