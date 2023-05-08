import { Box, Button, Collapse, Divider, Grid, TextField, Typography } from "@material-ui/core";
import RoomIcon from "@material-ui/icons/Room";
import { bootstrapTextFieldHook } from "components/commons/input/bootstrap";
import React from "react";
import { Marker } from "./index";

export interface ResultItemProps {
    item: Marker;
    setItemEdit: (value: Marker | null) => void;
    itemEdit: Marker | null;
    handleSubmitEdit: (values: Marker) => void;
    handleRemove: () => void;
    renderDetails: (item: Marker, showDetail: boolean) => JSX.Element;
}

const ResultItem: React.FC<ResultItemProps> = ({ item, setItemEdit, itemEdit, handleSubmitEdit, handleRemove, renderDetails }) => {
    const [showDetail, setShowDetail] = React.useState<boolean>(false);

    const labelStyles = bootstrapTextFieldHook.useLabel();
    const inputStyles = bootstrapTextFieldHook.useInput();

    function handleShowDetail() {
        setItemEdit(item);
        setShowDetail(!showDetail);
    }

    React.useEffect(() => {
        return () => setItemEdit(null);
    }, []);

    return (
        <Grid item xs={12}>
            <Divider />
            <Box style={{ display: "flex", marginTop: 10, justifyContent: "flex-start" }} className="grid-item">
                <RoomIcon fontSize="small" style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 5, color: "red" }} />
                <Typography variant="subtitle2" gutterBottom>
                    <span>{item.diaChiDayDu}</span>{" "}
                    <span style={{ color: item.diaChiKinhDo && item.diaChiViDo ? "green" : "red" }}>{`(${
                        item.diaChiKinhDo && item.diaChiViDo ? "Đã chọn tọa độ" : "Chưa chọn tọa độ"
                    })`}</span>
                </Typography>
            </Box>
            <Box style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Collapse in={showDetail}>
                    <Grid item xs={12} style={{ marginBottom: 10 }}>
                        <TextField
                            fullWidth
                            label={"Kinh độ:"}
                            type="text"
                            value={
                                itemEdit
                                    ? Math.round(itemEdit.diaChiKinhDo * 100000) / 100000
                                    : Math.round(item.diaChiKinhDo * 100000) / 100000
                            }
                            disabled={itemEdit?.diaChiKinhDo === item.diaChiKinhDo ? false : true}
                            InputLabelProps={{ classes: labelStyles }}
                            InputProps={{
                                disableUnderline: true,
                                classes: inputStyles,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label={"Vĩ độ:"}
                            type="text"
                            value={
                                itemEdit ? Math.round(itemEdit.diaChiViDo * 100000) / 100000 : Math.round(item.diaChiViDo * 100000) / 100000
                            }
                            disabled={itemEdit?.diaChiViDo === item.diaChiViDo ? false : true}
                            InputLabelProps={{ classes: labelStyles }}
                            InputProps={{
                                disableUnderline: true,
                                classes: inputStyles,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box className="button-group" marginTop="5px">
                            <Button
                                variant="contained"
                                className="button_mobile"
                                color="primary"
                                // disabled={itemEdit === null}
                                disabled
                                disableElevation
                                onClick={() => handleSubmitEdit(item)}
                            >
                                Lưu
                            </Button>
                            <Button
                                variant="contained"
                                className="button_mobile"
                                color="default"
                                disabled
                                // disabled={itemEdit !== null}
                                disableElevation
                                onClick={() => setItemEdit(item)}
                            >
                                Đặt lại tọa độ
                            </Button>
                            <Button
                                variant="contained"
                                className="button_mobile"
                                color="secondary"
                                disabled
                                // disabled={itemEdit === null}
                                disableElevation
                                onClick={handleRemove}
                            >
                                Xóa
                            </Button>
                        </Box>
                    </Grid>
                </Collapse>
                {renderDetails(item, showDetail)}
            </Box>
            <span style={{ margin: 20, color: "rgb(54, 127, 169)", cursor: "pointer" }} onClick={handleShowDetail}>
                {showDetail ? "Quay lại kết quả tìm kiếm" : "Xem chi tiết"}
            </span>
            <Divider style={{ marginTop: 10 }} />
        </Grid>
    );
};

export default ResultItem;
