import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { closeConfirmation, openConfirmation } from "redux/actions/confirmDialogAction";

export interface ButtonResetDialogProps {
    handleResetForm: () => void;
}

const ButtonResetDialog: React.FC<ButtonResetDialogProps> = ({ handleResetForm }) => {
    const dispatch = useDispatch();
    function handleDeleteForm() {
        dispatch(
            openConfirmation({
                id: "xoaFormCapDoi",
                open: true,
                title: "Làm mới dữ liệu",
                content: "Bạn có chắc chắn thực hiện thao tác?",
                value: "",
                onClose: (isOk) => handleReset(Boolean(isOk)),
            })
        );
    }

    function handleReset(isOk: boolean) {
        if (isOk) {
            handleResetForm();
        }
        dispatch(closeConfirmation());
    }

    return (
        <Button variant="contained" color="secondary" disableElevation onClick={() => handleDeleteForm()}>
            Xóa
        </Button>
    );
};

export default ButtonResetDialog;
