import { Box, Button, ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from "@material-ui/core";
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import React, { useRef, useState } from "react";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import {AttachIcon} from "../attachFileTooltip/attachFileTooltip";
import {AttachFileDTO} from "../../../models/attachFileDTO";
import {LoadingAction} from "../../../redux/actions/applicationAction";
import {useContextDropZone} from "../../../hooks/useContextDropZone";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(0.5),
        },
        menuItem: {
            color: "#0821af",
            textDecoration: "none",
            padding: "10px 15px",
            '&:hover': {
                color: "#0821af",
                cursor: "pointer",
                backgroundColor: "#bfc1cc",
                fontWeight: "bold",
            },
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingLeft: '5px',
            paddingRight: '5px'
        }
    }),
);

export const CustomButton = withStyles((theme: Theme) =>
    createStyles({
        root: {
            textTransform: 'none',
        },
        sizeSmall: {
            fontSize: '13px'
        },
        startIcon: {
            marginRight: theme.spacing(0.5),
            marginLeft: '20px'
        }
        // ,
        // '&:focus': {
        //     outlineWidth: '0px',
        //     outlineStyle: 'none'
        // }
    }),
)(Button);

export interface TepDinhKemPopperProps {
    data: AttachFileDTO[];
}

export const TepDinhKemPopper = (props: TepDinhKemPopperProps) => {
    const classes = useStyles();
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const dispatchLoading = useDispatch<Dispatch<LoadingAction>>();
    const files = useContextDropZone();
    const showHidePopperThaoTac = () => {
        setOpen(!open);
    }
    const handleClosePopperThaoTac = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };
    const handleToggle = () => {
        setShowModal(!showModal);
    }

    const handleDownloadFile = async (file: AttachFileDTO) => {
        console.log("Download File: ", file)
        await files.handleDownloadFileCustom(file)
    };
    return (
        <>
            <CustomButton className={classes.margin} startIcon={<AttachFileIcon />}
                          size="small" color="primary" disableRipple
                          ref={anchorRef} aria-haspopup="true"
                          aria-controls={open ? 'menu-list-grow' : undefined} onClick={(e) => {
                showHidePopperThaoTac();
            }} >
                {"(" + (props.data ? props.data.length : '0') + ")"}
            </CustomButton>
            <Popper style={{ zIndex: 9999 }} disablePortal open={open} anchorEl={anchorRef.current} role={undefined} transition>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClosePopperThaoTac}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" >
                                    {
                                        props.data?.map((file, k) => {
                                            return (
                                                <MenuItem key={k}>
                                                    <CustomButton className={classes.margin}
                                                                  size="small" color="primary" disableRipple
                                                                  onClick={() => handleDownloadFile(file)}
                                                                  startIcon={<AttachIcon fileName={"" + file.name} />}
                                                    >
                                                        {file.name}
                                                    </CustomButton>
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    )
}
