import { Box, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import "./cardDashBoard.css";

export interface CardDashBoardProps {
    text: string;
    icon: ReactNode;
    bgColor: string;
    idx: number;
    backgroundCard: string;
    children?: any;
}

const CardDashBoard: React.FC<CardDashBoardProps> = ({ children, text, icon, bgColor, idx, backgroundCard }) => {
    return (
        <Grid item xs={12} sm={12} md={6} lg={3}>
            <motion.div
                animate={{
                    scale: 1,
                }}
                initial={{
                    scale: 1.3,
                }}
                transition={{
                    delay: idx * 0.02,
                }}
            >
                <Paper elevation={2} sx={{ py: "1rem", px: "0.8rem", backgroundColor: `${backgroundCard}`, minHeight: "10.3rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Box component="div" display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-start">
                        <motion.div
                            animate={{ opacity: 1, x: 0 }}
                            initial={{
                                opacity: 0,
                                x: 100,
                            }}
                            transition={{
                                delay: idx * 0.03,
                            }}
                        >
                            <Box
                                component="div"
                                display="flex"
                                width="40px"
                                height="40px"
                                // sx={{ background: bgColor }}
                                borderRadius="100px"
                                justifyContent="center"
                                alignItems="center"
                                marginLeft={"10px"}
                                marginTop={"35px"}
                            >
                                {icon}
                            </Box>
                        </motion.div>

                        <motion.div
                            animate={{ opacity: 1, rotateZ: "360deg", scale: 1 }}
                            initial={{ opacity: 0, rotateZ: "0deg", scale: 1.3 }}
                            transition={{ delay: 1 }}
                        >
                            <Box color="#FFF" component="span" fontWeight="bold" />
                        </motion.div>
                        {/* <Box component="div">{text}</Box> */}
                        <Box component="span" color="#FFF" fontSize={"15px"} fontWeight={"500"}>
                            {text}
                        </Box>
                    </Box>
                    <Box
                        component="div"
                        color="#FFF"
                        fontWeight="600"
                        fontSize={"18px"}
                        // alignItems="flex-end"
                        display={"flex"}
                        justifyContent={"flex-end"}
                        textAlign={"right"}
                    >
                        {children}
                    </Box>
                </Paper>
            </motion.div>
        </Grid>
    );
};

export default CardDashBoard;