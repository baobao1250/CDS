import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const CustomAccordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
    paddingBottom: "10px",
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&:before": {
        display: "none",
    },
}));

const CustomAccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />} {...props} />
))(({ theme }) => ({
    // backgroundColor: "#d9edf7",
    // flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
}));

const CustomAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export interface CustomAccordionProps {
    title: string;
    children: any;
    defaultExpanded?: boolean;
    backgroundColor?: string;
    rowReverse?: boolean;
    color?: string;
    colorIcon?: string;
    radiusSummary?: string;
    borderAccordion?: string;
    paddingDetails?: string;
    minHeight?: string
}

const CustomizedAccordion: React.FC<CustomAccordionProps> = ({
    title,
    children,
    defaultExpanded,
    backgroundColor,
    rowReverse,
    color,
    colorIcon,
    radiusSummary,
    borderAccordion,
    paddingDetails,
    minHeight
}: CustomAccordionProps) => {
    return (
        <CustomAccordion
            defaultExpanded={defaultExpanded !== undefined ? defaultExpanded : true}
            sx={{ borderRadius: "5px", border: borderAccordion && borderAccordion }}
        >
            <CustomAccordionSummary
                sx={{
                    backgroundColor: backgroundColor ? `${backgroundColor}` : "#d9edf7",
                    flexDirection: rowReverse ? "row-reverse" : "none",
                    borderRadius: radiusSummary ? radiusSummary : "0px",
                    minHeight: minHeight ? minHeight: "48px"
                }}
                expandIcon={<ArrowForwardIosRoundedIcon sx={{ fill: colorIcon ? colorIcon : "#3a87ad", fontSize: "20px" }} />}
            >
                <Typography color={color ? color : "black"}>{title}</Typography>
            </CustomAccordionSummary>
            <CustomAccordionDetails sx={{ padding: paddingDetails && paddingDetails }}>{children}</CustomAccordionDetails>
        </CustomAccordion>
    );
};

export default CustomizedAccordion;
