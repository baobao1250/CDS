import React from "react";
import { createStyles, makeStyles, MenuItem, TextField } from "@material-ui/core";
import { ThanhCongCuDTO, ThanhCongCuService } from "apis/thanhCongCu/thanhCongCuService";
import { LIST_FUNCTION, LIST_THANHCONGCU, LIST_THANHCONGCU_SIZE_TOI_DA } from "constants/constants";
import { BaseResponse } from "apis/baseService";
import { useDispatch, useSelector } from "react-redux";
import { openNotification } from "apis/redux/actions/notificationAction";
import {
    BTN_ADD_CLICK,
    BTN_DELETE_CLICK,
    BTN_EXPORT_EXCEL_CLICK,
    BTN_EXPORT_PDF_CLICK,
    BTN_EXPORT_WORD_CLICK,
    BTN_MERGE_CLICK,
    BTN_SEARCH_CLICK,
    BTN_UPDATE_CLICK,
} from "constants/function";
import axios, { Method } from "axios";

import AXIOS_INSTANCE from "apis/axiosClient";
import { useHistory, useLocation } from "react-router-dom";
import { closeConfirmation, openConfirmation } from "redux/actions/confirmDialogAction";
import InputAdornment from "@material-ui/core/InputAdornment";
import { RootState } from "redux/reducers/rootReducer";
import { TypeCaNhanHoa } from "apis/caNhanHoaService/caNhanHoaService";
import { CauHinhThanhCongCu, KICH_CO, ORDER } from "models/cauHinhThuocTinh";
import { getToken } from "helpers/localStorage";

export interface RenderButtonScreenProps {
    onSubmitData: (type: string, open: boolean) => void;
    idList: string[];
    title: string;
    formik: any;
    openDialog?: boolean;
    currentColor?: string;
    orderBy: number;
}

export interface RenderButtonDTO extends ThanhCongCuDTO {
    method: string;
    endpoint: string;
}

const RenderButtonScreen = (props: RenderButtonScreenProps) => {
    const dispatch = useDispatch();
    const history = useHistory<any>();
    const location = useLocation();
    const [renderButton, setRenderButton] = React.useState<RenderButtonDTO[]>([]);
    const [renderButtonSort, setRenderButtonSort] = React.useState<RenderButtonDTO[]>([]);

    React.useEffect(() => {
        getRenderButton(location.pathname);
    }, []);

    const useStyles = makeStyles(() =>
        createStyles({
            button: {
                "&:hover": {
                    backgroundColor: props.currentColor,
                },
            },
        })
    );

    const classes = useStyles();

    const { caNhanHoa } = useSelector((state: RootState) => state.caNhanHoaReducer);

    const caNhanHoaTab = caNhanHoa.find((item) => item.type === TypeCaNhanHoa.THANH_CONG_CU) as unknown as {
        content: CauHinhThanhCongCu;
    };

    const caNhanHoaCaNhan = caNhanHoa.find((item) => {
        if (item.userId && item.type === TypeCaNhanHoa.THANH_CONG_CU) return item;
    }) as unknown as {
        content: CauHinhThanhCongCu;
    };

    async function getRenderButton(path: string) {
        await new ThanhCongCuService()
            .renderButton(path)
            .then((resp: BaseResponse) => {
                if (resp.isSuccess) {
                    setRenderButton(resp.data);
                }
            })
            .catch((e) => {
                dispatch(openNotification({ severity: "error", content: e, open: true }));
            });
    }

    async function handAPI(method: string, data: any, endpoint: string, functionName: string) {
        const token = getToken();
        let methodParam: Method = method as Method;
        let messageError: string = "";
        axios.defaults.timeout = 20000;
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        const params1 = new URLSearchParams({
            ids: data,
        });
        await axios({
            method: methodParam,
            url: `${AXIOS_INSTANCE.defaults.baseURL}/${endpoint}`,
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": "vi;",
            },
            data: data,
            params: functionName === BTN_DELETE_CLICK ? params1 : data,
        })
            .then((res) => {
                if (res.status === 200 && 202) {
                    dispatch(
                        openNotification({
                            severity: "success",
                            content: res.data.message,
                            open: true,
                        })
                    );
                    history.push(location.pathname);
                }
            })
            .catch((error) => {
                if (error.data) {
                    messageError = error.data.message;
                } else {
                    messageError = "Có lỗi khi thực hiện kết nối tới server";
                }
                dispatch(
                    openNotification({
                        severity: "error",
                        content: messageError,
                        open: true,
                    })
                );
            });
    }

    function handleDeleteItem(method: string, data: any, endpoint: string, functionName: string) {
        dispatch(
            openConfirmation({
                id: "tlhc-xbp-dm-confirmDialog",
                open: true,
                title: "Xóa " + props.title,
                content: "Bạn có chắc chắn xóa dữ liệu này?",
                value: "",
                onClose: (isOk) => handleClose(Boolean(isOk), method, data, endpoint, functionName),
            })
        );
    }

    async function handleClose(isOk: boolean, method: string, data: any, endpoint: string, functionName: string) {
        if (Boolean(isOk)) {
            handAPI(method, data, endpoint, functionName);
        }
        dispatch(closeConfirmation());
    }

    function handleEndpoint(method: string, endpoint: string, funtionName: string, openDialog?: boolean) {
        switch (funtionName) {
            case BTN_SEARCH_CLICK:
                props.onSubmitData(BTN_SEARCH_CLICK, false);
                break;
            case BTN_ADD_CLICK:
                if (openDialog) {
                    if (props.idList.length > 1) {
                        dispatch(
                            openNotification({
                                severity: "warning",
                                content: "Vui lòng chỉ chọn 1 dòng dữ liệu",
                                open: true,
                            })
                        );
                    } else if (props.idList.length == 0) {
                        dispatch(
                            openNotification({
                                severity: "warning",
                                content: "Vui lòng chọn dữ liệu để thêm",
                                open: true,
                            })
                        );
                    } else {
                        props.onSubmitData(BTN_ADD_CLICK, true);
                    }
                } else {
                    props.onSubmitData(BTN_ADD_CLICK, true);
                }
                break;
            case BTN_UPDATE_CLICK:
                if (props.idList.length > 1) {
                    dispatch(
                        openNotification({
                            severity: "warning",
                            content: "Vui lòng chỉ chọn 1 dòng dữ liệu để chỉnh sửa",
                            open: true,
                        })
                    );
                } else if (props.idList.length == 0) {
                    dispatch(
                        openNotification({
                            severity: "warning",
                            content: "Vui lòng chọn dữ liệu để chỉnh sửa",
                            open: true,
                        })
                    );
                } else {
                    props.onSubmitData(BTN_UPDATE_CLICK, true);
                }
                break;
            case BTN_DELETE_CLICK:
                if (props.idList.length > 0) {
                    // if (method && endpoint) {
                    //     handleDeleteItem(method, props.idList, endpoint, BTN_DELETE_CLICK);
                    // } else {
                    //     dispatch(
                    //         openNotification({
                    //             severity: "warning",
                    //             content: "Chức năng không khả dụng",
                    //             open: true,
                    //         })
                    //     );
                    //     break;
                    // }
                    props.onSubmitData(BTN_DELETE_CLICK, true);
                } else {
                    dispatch(
                        openNotification({
                            severity: "warning",
                            content: "Vui lòng chọn dữ liệu để xóa",
                            open: true,
                        })
                    );
                }
                break;
            case BTN_MERGE_CLICK:
                dispatch(
                    openNotification({
                        severity: "warning",
                        content: "Chức năng không khả dụng",
                        open: true,
                    })
                );
                break;
            case BTN_EXPORT_WORD_CLICK:
                // dispatch(
                //     openNotification({
                //         severity: "warning",
                //         content: "Chức năng không khả dụng",
                //         open: true,
                //     })
                // );
                props.onSubmitData(BTN_EXPORT_WORD_CLICK, false);
                break;
            case BTN_EXPORT_EXCEL_CLICK:
                // dispatch(
                //     openNotification({
                //         severity: "warning",
                //         content: "Chức năng không khả dụng",
                //         open: true,
                //     })
                // );
                // break;

                props.onSubmitData(BTN_EXPORT_EXCEL_CLICK, false);
                break;

            case BTN_EXPORT_PDF_CLICK:
                // dispatch(
                //     openNotification({
                //         severity: "warning",
                //         content: "Chức năng không khả dụng",
                //         open: true,
                //     })
                // );
                // break;
                props.onSubmitData(BTN_EXPORT_PDF_CLICK, false);
                break;
            default:
                break;
        }
    }

    React.useEffect(() => {
        if (renderButton && renderButton.length > 0) {
            // A-Z
            if (caNhanHoaTab && caNhanHoaTab.content && Number(caNhanHoaTab.content.orderBy) === 0) {
                setRenderButtonSort(
                    renderButton.sort((a, b) => {
                        let fa = a.icon.toLowerCase(),
                            fb = b.icon.toLowerCase();

                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        return 0;
                    })
                );
            }

            // Z-A
            if (caNhanHoaTab && caNhanHoaTab.content && Number(caNhanHoaTab.content.orderBy) === 1) {
                setRenderButtonSort(
                    renderButton.sort((a, b) => {
                        let fa = a.icon.toLowerCase(),
                            fb = b.icon.toLowerCase();

                        if (fa < fb) {
                            return 1;
                        }
                        if (fa > fb) {
                            return -1;
                        }
                        return 0;
                    })
                );
            }

            // A-Z
            if (caNhanHoaCaNhan && caNhanHoaCaNhan.content && Number(caNhanHoaCaNhan.content.orderBy) === 0) {
                setRenderButtonSort(
                    renderButton.sort((a, b) => {
                        let fa = a.icon.toLowerCase(),
                            fb = b.icon.toLowerCase();

                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        return 0;
                    })
                );
            }

            // Z-A
            if (caNhanHoaCaNhan && caNhanHoaCaNhan.content && Number(caNhanHoaCaNhan.content.orderBy) === 1) {
                setRenderButtonSort(
                    renderButton.sort((a, b) => {
                        let fa = a.icon.toLowerCase(),
                            fb = b.icon.toLowerCase();

                        if (fa < fb) {
                            return 1;
                        }
                        if (fa > fb) {
                            return -1;
                        }
                        return 0;
                    })
                );
            }
        }
    }, [caNhanHoaCaNhan, caNhanHoaTab, renderButton]);

    return (
        <div style={{ display: "flex", alignItems: "center", padding: 2 }}>
            {renderButtonSort &&
                renderButtonSort.length > 0 &&
                renderButtonSort.map((item, index) => {
                    let objFunction = LIST_FUNCTION.find((i) => i.ten === item.function);
                    let objThanhCongCu = LIST_THANHCONGCU.find((i) => i.ma === item.icon);

                    // if (caNhanHoa)
                    if (caNhanHoaTab && caNhanHoaTab.content.sizeCongCu === KICH_CO.TOI_DA) {
                        objThanhCongCu = LIST_THANHCONGCU_SIZE_TOI_DA.find((i) => i.ma === item.icon);
                    }

                    if (caNhanHoaCaNhan && caNhanHoaCaNhan.content.sizeCongCu === KICH_CO.TOI_DA) {
                        objThanhCongCu = LIST_THANHCONGCU_SIZE_TOI_DA.find((i) => i.ma === item.icon);
                    }

                    let colorIcon: string | undefined = "";
                    if (item.function === BTN_SEARCH_CLICK) {
                        colorIcon = "black";
                    } else if (item.function === BTN_ADD_CLICK) {
                        colorIcon = objFunction?.color;
                    } else if (item.function === BTN_UPDATE_CLICK) {
                        colorIcon = objFunction?.color;
                    } else if (item.function === BTN_DELETE_CLICK) {
                        colorIcon = objFunction?.color;
                    }
                    return (
                        <div style={item.function === BTN_SEARCH_CLICK ? { display: "inline-block" } : {}}>
                            {item.function === BTN_SEARCH_CLICK && (
                                <TextField
                                    style={{ width: 400 }}
                                    type="text"
                                    onChange={(e) => props.formik.setFieldValue("keywordsButton", e.target.value)}
                                    InputProps={{
                                        disableUnderline: true,
                                        endAdornment: (
                                            <div onClick={() => handleEndpoint(item.method, item.endpoint, item.function)}>
                                                <InputAdornment position="start" style={{ position: "absolute", right: 5, cursor: "pointer" }}>
                                                    {objThanhCongCu?.icon}
                                                </InputAdornment>
                                            </div>
                                        ),
                                    }}
                                />
                            )}
                            {item.function !== BTN_SEARCH_CLICK && (
                                <div
                                    style={{
                                        float: "left",
                                        marginLeft: `${index > 0 ? 5 : 0}px`,
                                        borderRadius: 3,
                                    }}
                                    onClick={() => handleEndpoint(item.method, item.endpoint, item.function, props.openDialog)}
                                    className={classes.button}
                                >
                                    <MenuItem
                                        title={item.name}
                                        key={index}
                                        value={index}
                                        style={{
                                            fontSize: 12,
                                            height: 33,
                                            color: colorIcon,
                                        }}
                                    >
                                        {objThanhCongCu?.icon}
                                    </MenuItem>
                                </div>
                            )}
                        </div>
                    );
                })}
        </div>
    );
};
export default RenderButtonScreen;
