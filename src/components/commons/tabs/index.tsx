import { Box, createStyles, Tab, TabProps, Tabs, Theme, Typography, withStyles } from "@material-ui/core";
import React from "react";

interface StyledTabsProps {
    value: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

export const CustomTabs = withStyles({
    indicator: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        "& > span": {
            // maxWidth: 40,
            width: "100%",
            backgroundColor: "#797979",
        },
    },
})((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

interface StyledTabProps extends TabProps {
    label: string;
}

export const CustomTab = withStyles((theme: Theme) =>
    createStyles({
        root: {
            textTransform: "none",
            color: "#333333",
            fontWeight: "bold",
            "&:focus": {
                opacity: 1,
            },
        },
    })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

export interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}
export const CustomTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`bussiness-tabpanel-${index}`} aria-labelledby={`bussiness-tab-${index}`} {...other}>
            <Box p={1}>
                <Typography component="div">{children}</Typography>
            </Box>
        </div>
    );
};
