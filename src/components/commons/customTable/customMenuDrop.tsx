import { Box, IconButton, Menu, MenuItem, MenuProps, withStyles } from "@material-ui/core";
import ViewListIcon from "@material-ui/icons/ViewList";
import React from "react";
import { Action } from "./customTableInterface";

export interface CustomMenuProps<T> {
    item: T;
    actions?: Action<T>[];
}

const StyledMenu = withStyles({
    paper: {
        border: "1px solid #d3d4d5",
        borderRadius: 0,
        width: "300",
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        "&:focus": {
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.common.white,
            },
        },
        "&:hover": {
            color: "#367fa9",
            fontStyle: "italic",
        },
    },
}))(MenuItem);

const CustomMenu = <T extends object>({ item, actions }: CustomMenuProps<T>) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    return (
        <>
            <Box display="flex" justifyContent="center">
                <IconButton
                    color="default"
                    aria-label="edit"
                    size="small"
                    onClick={(e) => {
                        setAnchorEl(e.currentTarget);
                    }}
                >
                    <ViewListIcon />
                </IconButton>
                <StyledMenu open={Boolean(anchorEl)} anchorEl={anchorEl} keepMounted onClose={() => setAnchorEl(null)} elevation={0}>
                    {actions !== undefined &&
                        actions.map((ac, i) => (
                            <StyledMenuItem
                                disableRipple
                                onClick={() => {
                                    ac.func && ac.func(item);
                                    setAnchorEl(null);
                                }}
                            >
                                <IconButton style={{ backgroundColor: "transparent" }} size="small" disableRipple>
                                    {ac.icon}
                                </IconButton>
                                {ac.title}
                            </StyledMenuItem>
                        ))}
                </StyledMenu>
            </Box>
        </>
    );
};

export default CustomMenu;
