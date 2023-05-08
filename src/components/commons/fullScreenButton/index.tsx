import { IconButton } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeFullScreen, openFullScreen } from "../../../redux/actions/fullScreenAction";
import { RootState } from "../../../redux/reducers/rootReducer";
import { CropIconMui } from "../icons/icons";

export interface ButtonScreenProps {}

const ButtonScreen: React.FC<ButtonScreenProps> = ({}) => {
    const dispatch = useDispatch();
    const { open } = useSelector((state: RootState) => state.fullScreenReducer);
    function handleClick() {
        if (open) {
            dispatch(openFullScreen());
        } else {
            dispatch(closeFullScreen());
        }
    }

    return (
        <IconButton style={{ padding: 0 }} onClick={handleClick}>
            <CropIconMui />
        </IconButton>
    );
};

export default ButtonScreen;
