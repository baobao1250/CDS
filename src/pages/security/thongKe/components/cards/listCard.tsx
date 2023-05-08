import { Grid, Paper, Typography,Box } from "@mui/material";
import React from "react";
import CardDashBoard from "./cardDashBoard";


export interface ListCardProps {
	title?: string;
	listDataGroup?: any;
}
const ListCardThongKe: React.FC<ListCardProps> = ({ title, listDataGroup }) => {
	// const {listData, handldeChangeCurrentYear } = React.useContext(DashBoardContext);
	const [valueYear, setValueYear] = React.useState("2023");
	
	const listData = [
		{}
	]
	return (
		<>
			<Grid container xs={12} margin="20px" marginBottom={"-18px"} marginRight={"0px"} spacing={3}>
			</Grid>
			<Paper
				elevation={12}
				sx={{ width: "100%", height: "100%", margin: "20px 0 20px", marginLeft: "40px", padding: "0px 0px 0px 0px" }}
			>
				<Typography sx={{
					fontFamily: 'Inter',
					fontStyle: "normal",
					fontWeight: 600,
					fontSize: "18px",
					lineHeight: "22px",
					color: "#000000",
					marginLeft: "25px",
					marginTop: "0px"

				}}>
				</Typography>
				<Grid container xs={12} padding="25px" paddingRight={"0"} spacing={3}>
					{
						listData.map((item: any) => {
							return (
								<CardDashBoard
									idx={2}
									text={item.title}
									icon={item.icon}
									bgColor={"#03118A"}
									backgroundCard={item.bgColor}
								>
									<Box component="span" color="#FFF" fontSize={"30px"} fontWeight={"600"}>
										{item.counter}
									</Box>
								</CardDashBoard>
							)
						})
					}
				</Grid>
			</Paper>
		</>
		
	);
};

export default ListCardThongKe;
