import { FC, ReactElement } from 'react';
import { styled } from '@mui/material/styles';//useTheme
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ListCardThongKe from '../thongKe/components/cards/listCard';
import { Typography } from '@mui/material';
import BarChart from '../thongKe/components/chart/barChart';
import PieChartNormal from '../thongKe/components/chart/pieChartNorrmal';
import PieChart from '../thongKe/components/chart/pieChart';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode !== 'dark' ? 'whitesmoke' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard: FC = (): ReactElement => {
  // const theme = useTheme();
  // sx={{[theme.breakpoints.down('sm')]: {display:'flex', flexDirection:'column', justifyContent:'center'}}}
  return (
    <>
    <Box sx={{ flexGrow: 1, p: 2}} >
        <Grid container spacing={2} sx={{ height: "310px", paddingTop: "0px !important" }}>
            <Grid item xs={10} sm={10} md={6} lg={6}>
                <Grid item xs={12}>
                    <Paper elevation={5} sx={{ height: "310px", margin: "10px", marginLeft: "20px" }}>
                        <Grid container item xs={12} sx={{ height: "17%", borderBottom: "1px solid #eff1f3;" }}>
                            <Grid item xs={6} display="flex" flexDirection="row" alignItems="center">
                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        marginLeft: "20px",
                                    }}
                                >
                                    CÁC QUỶ ĐÃ HOÀN THÀNH
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                container
                                xs={6}
                                display="flex"
                                flexDirection="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                paddingTop={"5px"}
                            >
                                <Box sx={{ width: "40%", marginRight: "20px" }} onClick={() => {}}>
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} sx={{ height: "88%" }}>
                            <Grid item xs={12} sx={{  marginLeft: "20px"  }} >
                                {/* <BarChart tinhOrHuyen = {true}/> */}
                                {/* <PieChart total={14} /> */}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs={10} sm={10} md={6} lg={6}>
                <Grid item xs={12}>
                    <Paper elevation={5} sx={{ height: "310px", margin: "10px", marginRight: "20px" }}>
                        <Grid container item xs={12} sx={{ height: "17%", borderBottom: "1px solid #eff1f3;" }}>
                            <Grid item xs={6} display="flex" flexDirection="row" alignItems="center">
                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        marginLeft: "20px",
                                    }}
                                >
                                    CÁC QUỶ ĐÃ HOÀN THÀNH
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                container
                                xs={6}
                                display="flex"
                                flexDirection="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                paddingTop={"5px"}
                            >
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} sx={{ height: "88%" }}>
                            <Grid item xs={12} sx={{  marginLeft: "20px"  }}>
                            {/* <BarChart tinhOrHuyen = {false}/> */}
                                
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>

        <Paper
            elevation={5}
            sx={{
                height: "300px",
                margin: "10px",
                marginLeft: "20px",
                marginTop: "40px",
                marginRight: "20px",
            }}
        >
            <Grid xs={12} display={"flex"} justifyContent={"space-between"} sx={{ padding: "10px" }}>
                <Typography
                    sx={{
                        fontWeight: 600,
                    }}
                >
                     TÌNH TRẠNG THỰC HIỆN QUỶ
                </Typography>
                
            </Grid>
           
        </Paper>
    </Box>
</>
  );
}

export default Dashboard;