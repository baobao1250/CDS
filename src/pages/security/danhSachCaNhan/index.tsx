import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
// import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import { CellProps, Column, useRowSelect, useTable  } from "react-table";
import { TableCell } from "@material-ui/core";
// import { Cell } from "../../../components/commons/table/tableCommons";
import { DanhSachCaNhanDTO, dataDSCN } from "../../../models/danhsachcanhan";
import { DMQuyDialog } from "./dialog";

interface Props{

}

const DMQUY: React.FC<Props>  = ():ReactElement => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [data, setData] = useState<DanhSachCaNhanDTO[]>([]);
    const [itemSelected, setItemSelected] = useState<DanhSachCaNhanDTO>({} as DanhSachCaNhanDTO);

    const closeDialog = async () => {
        await setOpenDialog(false);
        setItemSelected({} as DanhSachCaNhanDTO);
    };

    useEffect(() => {
        setData(dataDSCN);
    }, []);

    const handleSubmitData =  (data:any) => {
        setData([...data,data]);
          setOpenDialog(false);
          setItemSelected({} as DanhSachCaNhanDTO);
         
    };

const handleDelete = (id: number) => {
        const index = data.findIndex(data => data.id === id);
        if (index > -1) {
            data.splice(index, 1);
            setData([...data]);
        }
      };

  return (
    <>
          <Grid container item xs={12} margin={2} >  
          <Grid item xs={8}>
                        <TextField
                            fullWidth
                            placeholder="Nhập nội dung tìm kiếm"
                            inputProps={{ "aria-label": "description" }}
                            
                        />
          </Grid>
          <Grid item xs={4} className="grid-item" justifyContent="flex-end">
                        <Box justifyContent="flex-end" display="flex">
                            <Button
                                variant="contained"
                                style={{ backgroundColor: "#5fba63", color: "#fff",  width: 200 }}
                                onClick={() => {
                                    setOpenDialog(true);
                                }}
                            >
                                {/* <AddIcon style={{ color: "#FFF", marginRight: 5, fontSize: 17 }} /> */}
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
        
          <TableContainer  component={Paper} >
                <Table aria-label="customized table" size="medium">
                    <TableHead >
                        <TableRow>
                            <TableCell  component="th" className="bold-cell" scope="row" align="center" width="5%">
                                Mã
                            </TableCell >
                            <TableCell component="th" scope="row" align="center" width="15%">
                                Họ và tên
                            </TableCell>
                          
                            <TableCell component="th" scope="row" align="center" width="10%">
                                Số điện thoại
                            </TableCell>
                            <TableCell component="th" scope="row" align="center" width="15%">
                                Gmail
                            </TableCell>
                            <TableCell component="th" scope="row" align="center" width="20%">
                                Số tiền nộp
                            </TableCell>
                            <TableCell component="th" scope="row" align="center" width="20%">
                            Ngay nộp
                            </TableCell>
                            <TableCell component="th" scope="row" align="center" width="20%">
                              Nội dung
                            </TableCell>
                            
                            <TableCell component="th" scope="row" align="center" width="10%">
                                Thao tác
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, i) => (
                            <TableRow key={row.id} >
                                <TableCell scope="row" align="center">
                                    {row.code}
                                </TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.sdt}</TableCell>
                                <TableCell align="center">{row.gmail}</TableCell>
                                <TableCell align="center">{row.sotien}</TableCell>
                                <TableCell align="center">{row.ngaynop}</TableCell>
                                <TableCell align="center">{row.noidung}</TableCell>
                                <TableCell align="center">
                                    <Box display="flex" justifyContent="center">
                                        <IconButton
                                            color="primary"
                                            aria-label="edit"
                                            size="small"
                                            onClick={() => {
                                                setOpenDialog(true);
                                                setItemSelected(row);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            aria-label="delete"
                                            size="small"
                                            onClick={() => {
                                                handleDelete(row.id)
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
           
            <Paper component="div">
                {openDialog && (
                    <DMQuyDialog 
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
};

export default DMQUY;