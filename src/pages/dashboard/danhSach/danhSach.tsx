import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { Box, Button, Collapse, Grid, IconButton, InputBase, InputLabel, NativeSelect, Paper, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
// import AddIcon from "@material-ui/icons/Add";
import { DanhMucQuyDTO, dataDMQuy } from "../../../models/interace";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import { EditIconMUI, RemoveIconMUI } from "../../../components/commons/icons/icons";
// import { CellProps, Column, useRowSelect, useTable  } from "react-table";
import { TableCell } from "@material-ui/core";
import { log } from "console";
import { Cell } from "../../../components/commons/table/tableCommons";
import { DanhSachCongDanDTO,dataDSCD } from "../../../models/dsCongDan";


interface Props{

}

const DanhSach: React.FC<Props>  = ():ReactElement => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [dataQuy, setDataQuy] = useState<DanhSachCongDanDTO[]>([]);
    const [itemSelected, setItemSelected] = useState<DanhSachCongDanDTO>({} as DanhSachCongDanDTO);

    const closeDialog = async () => {
        await setOpenDialog(false);
        setItemSelected({} as DanhSachCongDanDTO);
    };

    useEffect(() => {
        setDataQuy(dataDSCD);
    }, []);
    
    const handleSubmitData =  (data:any) => {
          setDataQuy([...dataQuy,data]);
          setOpenDialog(false);
          setItemSelected({} as DanhSachCongDanDTO);
         
    };

const handleDelete = (id: number) => {
        const index = dataQuy.findIndex(dataQuy => dataQuy.id === id);
        if (index > -1) {
            dataQuy.splice(index, 1);
            setDataQuy([...dataQuy]);
        }
      };

  return (
    <>
        
          <Grid container item xs={12} marginTop={10} >  
          <Grid item xs={12} display={"flex"} justifyContent={"center"} marginBottom={2}>
            <Typography variant="body1" fontSize={20} fontWeight="bold">DANH SÁCH ĐĂNG KÍ ĐÓNG QUỶ</Typography>
            </Grid> 
          
          <TableContainer  component={Paper} >
                <Table aria-label="customized table" size="medium">
                    <TableHead >
                        <TableRow>
                            <TableCell  component="th" className="bold-cell" scope="row" align="center" width="5%">
                                Mã
                            </TableCell >
                            <Cell component="th" scope="row" align="center" width="15%">
                                Họ và tên
                            </Cell>
                          
                            <Cell component="th" scope="row" align="center" width="10%">
                                gmail
                            </Cell>
                            <Cell component="th" scope="row" align="center" width="10%">
                                quỷ tham gia
                            </Cell>
                            <Cell component="th" scope="row" align="center" width="15%">
                                ngày tạo
                            </Cell>
                            <Cell component="th" scope="row" align="center" width="20%">
                                địa chỉ
                            </Cell>
                            
                            <Cell component="th" scope="row" align="center" width="10%">
                                Thao tác
                            </Cell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataQuy.map((row, i) => (
                            <TableRow key={row.id} >
                                <Cell scope="row" align="center">
                                    {row.code}
                                    
                                </Cell>
                                <Cell align="center">{row.name}</Cell>
                                <Cell align="center">{row.cccd}</Cell>
                                <Cell align="center">{row.quy}</Cell>
                                <Cell align="center">{row.ngaytao}</Cell>
                                <Cell align="center">{row.diachi}</Cell>
                               
                               
                                <Cell align="center">
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
                                </Cell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
         
        </Grid>

      
       
    </>
  );
};

export default DanhSach;