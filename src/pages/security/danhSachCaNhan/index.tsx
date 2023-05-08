import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { Box, Button, Collapse, Grid, IconButton, InputBase, InputLabel, NativeSelect, Paper, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
// import AddIcon from "@material-ui/icons/Add";
import { ColumnCustomTable, CustomTable } from "../../../components/commons/customTable/customTable";
import { DanhMucQuyDTO, dataDMQuy } from "../../../models/interace";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { EditIconMUI, RemoveIconMUI } from "../../../components/commons/icons/icons";
// import { CellProps, Column, useRowSelect, useTable  } from "react-table";
import { Cell, CheckIconDeActive } from "../../../components/commons/table/tableCommons";
import CustomReactTable from "../../../components/commons/customReactTable/customReactTable";
import useContextTableFooter from "../../../hooks/useContextTableFooter";
import { TableCell } from "@material-ui/core";
import { DMQuyDialog } from "./dialog";
import { DanhSachCaNhanDTO,dataDSCN } from "../../../models/danhsachcanhan";

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
                            <Cell component="th" scope="row" align="center" width="15%">
                                Họ và tên
                            </Cell>
                          
                            <Cell component="th" scope="row" align="center" width="10%">
                                Số điện thoại
                            </Cell>
                            <Cell component="th" scope="row" align="center" width="15%">
                                Gmail
                            </Cell>
                            <Cell component="th" scope="row" align="center" width="20%">
                                Số tiền nộp
                            </Cell>
                            <Cell component="th" scope="row" align="center" width="20%">
                            Ngay nộp
                            </Cell>
                            <Cell component="th" scope="row" align="center" width="20%">
                              Nội dung
                            </Cell>
                            
                            <Cell component="th" scope="row" align="center" width="10%">
                                Thao tác
                            </Cell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, i) => (
                            <TableRow key={row.id} >
                                <Cell scope="row" align="center">
                                    {row.code}
                                </Cell>
                                <Cell align="center">{row.name}</Cell>
                                <Cell align="center">{row.sdt}</Cell>
                                <Cell align="center">{row.gmail}</Cell>
                                <Cell align="center">{row.sotien}</Cell>
                                <Cell align="center">{row.ngaynop}</Cell>
                                <Cell align="center">{row.noidung}</Cell>
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