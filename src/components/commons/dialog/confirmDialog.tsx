import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import { CaNhanHoaThongBao, TypeCaNhanHoa } from "apis/caNhanHoaService/caNhanHoaService";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers/rootReducer";
import { DialogActions, DialogContent, DialogTitle } from "./dialogCommons";
import InfoIcon from "@material-ui/icons/Info";
import { DM_UC_LEVEL } from "constants/constants";
import WarningIcon from "@material-ui/icons/Warning";
import CancelIcon from "@material-ui/icons/Cancel";
import { getUserId } from "helpers/localStorage";
export interface ConfirmationDialogRawProps {
    id: string;
    keepMounted: boolean;
    value?: string;
    open: boolean;
    onClose: (isOk?: boolean, isClose?: boolean) => void;
    title: string;
    content: React.ReactNode;
    active?: boolean;
    labelOk?: String;
    labelCancel?: String;
    component?: any;
}

export const ConfirmationDialogRaw = (props: ConfirmationDialogRawProps) => {
    const { onClose, open, labelOk, labelCancel, component, active, ...other } = props;

    const handleCancel = (isClose: boolean) => {
        onClose(false, isClose);
    };

    const handleOk = () => {
        onClose(true);
    };

    let fontColor = "black";
    let fontFamily = "Arial";
    let fontSize = 13;
    let width = "sm";

    const userId = getUserId();
    const { caNhanHoa } = useSelector((state: RootState) => state.caNhanHoaReducer);

    const caNhanHoaTab = caNhanHoa.find((item) => {
        if (item.type === TypeCaNhanHoa.THONG_BAO) return item;
    }) as unknown as CaNhanHoaThongBao;

    const caNhanHoaCaNhan = caNhanHoa.find((item) => {

        if (item.userId === userId && item.type === TypeCaNhanHoa.THONG_BAO) return item;
    }) as unknown as CaNhanHoaThongBao;

    if (caNhanHoaTab && caNhanHoaTab.content && active) {
        fontColor = caNhanHoaTab.content.color;
        fontFamily = caNhanHoaTab.content.fontChu;
        fontSize = caNhanHoaTab.content.fontSize;
        width = caNhanHoaTab.content.sizeThongBao;
    }

    if (caNhanHoaCaNhan && caNhanHoaCaNhan.content && active) {
        fontColor = caNhanHoaCaNhan.content.color;
        fontFamily = caNhanHoaCaNhan.content.fontChu;
        fontSize = caNhanHoaCaNhan.content.fontSize;
        width = caNhanHoaCaNhan.content.sizeThongBao;
    }

    function renderDialog() {
        switch (width) {
            case "sm":
                return (
                    <Dialog disableEscapeKeyDown fullWidth maxWidth="sm" aria-labelledby="confirmation-dialog-title" open={open} {...other}>
                        <DialogTitle id={other.id} onClose={() => handleCancel(true)}>
                            {" "}
                            {other.title}
                        </DialogTitle>
                        <DialogContent dividers>
                            {component && component}
                            <Box style={{ display: "flex", alignItems: "center", color: fontColor, fontFamily: fontFamily, fontSize: Number(fontSize) }}>
                                {other.value && other.value === DM_UC_LEVEL.INFO && (
                                    <InfoIcon color="primary" style={{ marginRight: 5, fontSize: Number(fontSize) }} />
                                )}
                                {other.value && other.value === DM_UC_LEVEL.WARN && (
                                    <WarningIcon style={{ color: "#ffd600", marginRight: 5, fontSize: Number(fontSize) }} />
                                )}
                                {other.value && other.value === DM_UC_LEVEL.ERROR && (
                                    // <ErrorIcon color= "error" style={{ marginRight: 5, fontSize: Number(fontSize) }} />
                                    <CancelIcon color="secondary" style={{ marginRight: 5, fontSize: Number(fontSize) }} />
                                )}

                                {other.content}
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" color="primary" disableElevation onClick={handleOk}>
                                {labelOk ? labelOk : "Đồng ý"}
                            </Button>
                            <Button variant="contained" color="default" disableElevation onClick={() => handleCancel(false)}>
                                {labelCancel ? labelCancel : "Hủy"}
                            </Button>
                        </DialogActions>
                    </Dialog>
                );
            case "md":
                return (
                    <Dialog disableEscapeKeyDown fullWidth maxWidth={width ?? "sm"} aria-labelledby="confirmation-dialog-title" open={open} {...other}>
                        <DialogTitle id={other.id} onClose={() => handleCancel(true)}>
                            {" "}
                            {other.title}
                        </DialogTitle>
                        <DialogContent dividers>
                            {component && component}
                            <Box style={{ display: "flex", alignItems: "center", color: fontColor, fontFamily: fontFamily, fontSize: Number(fontSize) }}>
                                {other.value && other.value === DM_UC_LEVEL.INFO && (
                                    <InfoIcon color="primary" style={{ marginRight: 5, fontSize: Number(fontSize) }} />
                                )}
                                {other.value && other.value === DM_UC_LEVEL.WARN && (
                                    <WarningIcon style={{ color: "#ffd600", marginRight: 5, fontSize: Number(fontSize) }} />
                                )}
                                {other.value && other.value === DM_UC_LEVEL.ERROR && (
                                    // <ErrorIcon color= "error" style={{ marginRight: 5, fontSize: Number(fontSize) }} />
                                    <CancelIcon color="secondary" style={{ marginRight: 5, fontSize: Number(fontSize) }} />
                                )}

                                {other.content}
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" color="primary" disableElevation onClick={handleOk}>
                                {labelOk ? labelOk : "Đồng ý"}
                            </Button>
                            <Button variant="contained" color="default" disableElevation onClick={() => handleCancel(false)}>
                                {labelCancel ? labelCancel : "Hủy"}
                            </Button>
                        </DialogActions>
                    </Dialog>
                );
            case "lg":
                return (
                    <Dialog disableEscapeKeyDown fullWidth maxWidth="lg" aria-labelledby="confirmation-dialog-title" open={open} {...other}>
                        <DialogTitle id={other.id} onClose={() => handleCancel(true)}>
                            {" "}
                            {other.title}
                        </DialogTitle>
                        <DialogContent dividers>
                            {component && component}
                            <Box style={{ display: "flex", alignItems: "center", color: fontColor, fontFamily: fontFamily, fontSize: Number(fontSize) }}>
                                {other.value && other.value === DM_UC_LEVEL.INFO && (
                                    <InfoIcon color="primary" style={{ marginRight: 5, fontSize: Number(fontSize) }} />
                                )}
                                {other.value && other.value === DM_UC_LEVEL.WARN && (
                                    <WarningIcon style={{ color: "#ffd600", marginRight: 5, fontSize: Number(fontSize) }} />
                                )}
                                {other.value && other.value === DM_UC_LEVEL.ERROR && (
                                    // <ErrorIcon color= "error" style={{ marginRight: 5, fontSize: Number(fontSize) }} />
                                    <CancelIcon color="secondary" style={{ marginRight: 5, fontSize: Number(fontSize) }} />
                                )}

                                {other.content}
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" color="primary" disableElevation onClick={handleOk}>
                                {labelOk ? labelOk : "Đồng ý"}
                            </Button>
                            <Button variant="contained" color="default" disableElevation onClick={() => handleCancel(false)}>
                                {labelCancel ? labelCancel : "Hủy"}
                            </Button>
                        </DialogActions>
                    </Dialog>
                );
        }
    }

    return (
        <>{renderDialog()}</>

        // <Dialog disableEscapeKeyDown fullWidth maxWidth={width ?? "sm"} aria-labelledby="confirmation-dialog-title" open={open} {...other}>
        //     <DialogTitle id={other.id} onClose={() =>handleCancel(true)}>
        //         {" "}
        //         {other.title}
        //     </DialogTitle>
        //     <DialogContent dividers >
        //         <Box style={{color: fontColor, fontFamily: fontFamily, fontSize: Number(fontSize)}}>
        //             {other.content}
        //         </Box>
        //     </DialogContent>
        //     <DialogActions>
        //         <Button variant="contained" color="primary" disableElevation onClick={handleOk}>
        //             Đồng ý
        //         </Button>
        //         <Button variant="contained" color="default" disableElevation onClick={() =>handleCancel(true)}>
        //             Hủy
        //         </Button>
        //     </DialogActions>
        // </Dialog>
    );
};
