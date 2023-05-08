import React from "react";
import { createTheme, StylesProvider, Theme, ThemeProvider } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers/rootReducer";
import { TypeCaNhanHoa } from "apis/caNhanHoaService/caNhanHoaService";
import { CauHinhLayout } from "models/cauHinhThuocTinh";
import { getUserId } from "helpers/localStorage";

export interface ProviderThemeProps {}

const ProviderTheme: React.FC<ProviderThemeProps> = ({ children }) => {
    const fontFamily = [
        "Arial",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(",");

    const helperTextColor = "#6c757d";
    const validColor = "#28a745";
    const errorColor = "#dc3545";

    // Màu nền paper
    // Màu menu list succes main
    // Màu Paper background
    // Màu header table background
    // Màu table phân trang background
    // Màu input background
    // MuiNativeSelect MuiSelect
    // MuiTableCell

    const themeLight = createTheme(
        {
            palette: {
                primary: {
                    main: "#367fa9",
                },
                // success: {},
            },
            overrides: {
                MuiInputBase: {
                    root: {
                        "label + &": {
                            marginTop: 3,
                        },
                    },
                    input: {
                        fontSize: "12px",
                        borderRadius: 4,
                        position: "relative",
                        backgroundColor: "#fff",
                        border: "1px solid #ced4da",
                        // fontSize: 14,
                        width: "100%",
                        padding: "8px 10px",
                        // marginLeft: "8px",
                        "&:focus": {
                            outline: "none",
                            borderRadius: 4,
                            borderColor: "#80bdff",
                        },
                        fontFamily,
                        "&[aria-invalid=true]": {
                            border: "1px solid #dc3545",
                        },
                        // "&:invalid": {
                        //     border: "1px solid #dc3545",
                        // },
                    },
                    inputMultiline: {
                        padding: "8px 10px",
                    },
                },
                MuiInputLabel: {
                    root: {
                        // paddingLeft: 10,
                        paddingBottom: 5,
                        position: "initial",
                        textAlign: "left",
                        transform: "none",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#7F7F7F", // theme.palette.text.primary
                        fontFamily,
                        "&.Mui-focused": {
                            color: "#7F7F7F", // theme.palette.text.primary
                        },
                        "& .MuiFormLabel-asterisk.MuiInputLabel-asterisk": {
                            color: "red",
                            "&::before": {
                                content: '"("',
                                marginRight: -3,
                            },
                            "&::after": {
                                content: '")"',
                            },
                            paddingLeft: 5,
                        },
                        "&& + *": {
                            // override initial styles
                            // label + .MuiInput-formControl
                            marginTop: 3,
                        },
                    },
                    shrink: {
                        transition: "none",
                        transform: "none",
                        color: "#7F7F7F",
                    },

                    formControl: {
                        transform: "none",
                        position: "initial",
                        // padding: 8,
                    },
                    animated: {
                        transition: "none",
                    },
                },
                MuiFormHelperText: {
                    root: {
                        fontFamily,
                        // paddingLeft: 8,
                        color: helperTextColor,
                        lineHeight: "19.2px",
                        marginTop: 3 / 2,
                        fontSize: "11px",
                        "&.-valid": {
                            color: validColor,
                        },
                        "&.-error": {
                            color: errorColor,
                        },
                    },
                },
                MuiNativeSelect: {
                    select: {
                        borderRadius: 4,
                        "&:focus": {
                            borderRadius: 4,
                        },
                    },
                },
                MuiSelect: {
                    select: {
                        borderRadius: 4,
                        "&:focus": {
                            borderRadius: 4,
                        },
                    },
                },
                MuiButton: {
                    text: {
                        textTransform: "none",
                    },
                    label: {
                        fontSize: "12px",
                        textTransform: "none",
                    },
                    containedPrimary: {
                        boxShadow: "none",
                        "&:hover": {
                            backgroundColor: "#367fa9",
                            boxShadow: "none",
                        },
                    },
                    textPrimary: {
                        boxShadow: "none",
                        "&:hover": {
                            boxShadow: "none",
                        },
                    },
                    contained: {
                        boxShadow: "none",
                        "&:hover": {
                            boxShadow: "none",
                        },
                    },
                },

                MuiTypography: {
                    body1: {
                        fontSize: 12,
                    },
                },
                MuiTableCell: {
                    root: {
                        fontSize: 12,
                    },
                },
                MuiSwitch: {
                    thumb: {
                        color: "#fff",
                    },
                },
            },
        },
        { index: 1 }
    );

    const [theme, setTheme] = React.useState<Theme>(themeLight);

    const { caNhanHoa } = useSelector((state: RootState) => state.caNhanHoaReducer);

    const caNhanHoaHeThong = caNhanHoa.find((item) => {
        if (item.type === TypeCaNhanHoa.LAYOUT && !item.userId) return item;
    }) as unknown as { content: CauHinhLayout };

    const caNhanHoaCaNhan = caNhanHoa.find((item) => {
        const userId = getUserId();
        if (item.type === TypeCaNhanHoa.LAYOUT && item.userId === userId) return item;
    }) as unknown as { content: CauHinhLayout };

    React.useEffect(() => {
        if (caNhanHoaHeThong && Object.values(caNhanHoaHeThong).length > 0) {
            setTheme({
                palette: {
                    primary: {
                        main: "#367fa9",
                    },
                    background: {
                        // paper: caNhanHoaHeThong.content.background, // Màu table
                        paper: "white", // Màu table
                    },
                    text: {
                        primary: caNhanHoaHeThong.content.mauTextTable,
                    },
                },
                overrides: {
                    MuiPaper: {
                        outlined: {
                            background: caNhanHoaHeThong.content.background, // Màu paper
                        },
                    },
                    MuiTableHead: {
                        root: {
                            background: caNhanHoaHeThong.content.mauTableHeader, // màu table header
                        },
                    },

                    MuiTablePagination: {
                        toolbar: {
                            background: caNhanHoaHeThong.content.mauTableFooter, // màu table footer
                        },
                    },
                    MuiInputBase: {
                        root: {
                            // background: caNhanHoaHeThong.content.background, // Màu input
                            background: "white",
                            "label + &": {
                                marginTop: 3,
                            },
                        },
                        input: {
                            fontSize: "12px",
                            borderRadius: 4,
                            position: "relative",
                            // background: caNhanHoaHeThong.content.background, // Màu input search
                            background: "white", // Màu input search
                            border: "1px solid #ced4da",
                            // fontSize: 14,
                            width: "100%",
                            padding: "8px 10px",
                            // marginLeft: "8px",
                            "&:focus": {
                                outline: "none",
                                borderRadius: 4,
                                borderColor: "#80bdff",
                            },
                            fontFamily,
                            "&[aria-invalid=true]": {
                                border: "1px solid #dc3545",
                            },
                            // "&:invalid": {
                            //     border: "1px solid #dc3545",
                            // },
                        },
                        inputMultiline: {
                            padding: "8px 10px",
                        },
                    },
                    MuiInputLabel: {
                        root: {
                            // paddingLeft: 10,
                            paddingBottom: 5,
                            position: "initial",
                            textAlign: "left",
                            transform: "none",
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#7F7F7F", // theme.palette.text.primary
                            fontFamily,
                            "&.Mui-focused": {
                                color: "#7F7F7F", // theme.palette.text.primary
                            },
                            "& .MuiFormLabel-asterisk.MuiInputLabel-asterisk": {
                                color: "red",
                                "&::before": {
                                    content: '"("',
                                    marginRight: -3,
                                },
                                "&::after": {
                                    content: '")"',
                                },
                                paddingLeft: 5,
                            },
                            "&& + *": {
                                // override initial styles
                                // label + .MuiInput-formControl
                                marginTop: 3,
                            },
                        },
                        shrink: {
                            transition: "none",
                            transform: "none",
                            color: "#7F7F7F",
                        },

                        formControl: {
                            transform: "none",
                            position: "initial",
                            // padding: 8,
                        },
                        animated: {
                            transition: "none",
                        },
                    },
                    MuiFormHelperText: {
                        root: {
                            fontFamily,
                            // paddingLeft: 8,
                            color: helperTextColor,
                            lineHeight: "19.2px",
                            marginTop: 3 / 2,
                            fontSize: "11px",
                            "&.-valid": {
                                color: validColor,
                            },
                            "&.-error": {
                                color: errorColor,
                            },
                        },
                    },
                    MuiNativeSelect: {
                        select: {
                            borderRadius: 4,
                            // background: caNhanHoaHeThong.content.background, // Màu input select
                            "&:focus": {
                                borderRadius: 4,
                            },
                        },
                    },
                    MuiSelect: {
                        select: {
                            borderRadius: 4,
                            // background: caNhanHoaHeThong.content.background, // Màu input select
                            "&:focus": {
                                borderRadius: 4,
                            },
                        },
                    },
                    MuiButton: {
                        text: {
                            textTransform: "none",
                        },
                        label: {
                            fontSize: "12px",
                            textTransform: "none",
                        },
                        containedPrimary: {
                            boxShadow: "none",
                            "&:hover": {
                                backgroundColor: "#367fa9",
                                boxShadow: "none",
                            },
                        },
                        textPrimary: {
                            boxShadow: "none",
                            "&:hover": {
                                boxShadow: "none",
                            },
                        },
                        contained: {
                            boxShadow: "none",
                            "&:hover": {
                                boxShadow: "none",
                            },
                        },
                    },
                    MuiTypography: {
                        body1: {
                            fontSize: 12,
                        },
                    },
                    MuiTableCell: {
                        root: {
                            fontSize: 12,
                        },
                        head: {
                            color: caNhanHoaHeThong.content.mauTextTable,
                        },
                        body: {
                            color: caNhanHoaHeThong.content.mauTextTable,
                        },
                    },
                    MuiSwitch: {
                        thumb: {
                            color: "#fff",
                        },
                    },
                },
            } as any);
        }
        if (caNhanHoaCaNhan && Object.values(caNhanHoaCaNhan).length > 0) {
            setTheme({
                palette: {
                    primary: {
                        main: "#367fa9",
                    },
                    background: {
                        // paper: caNhanHoaCaNhan.content.background, // Màu table
                        paper: "white", // Màu table
                    },
                    text: {
                        primary: caNhanHoaCaNhan.content.mauTextTable,
                    },
                },
                overrides: {
                    MuiPaper: {
                        outlined: {
                            background: caNhanHoaCaNhan.content.background, // Màu paper
                        },
                    },
                    MuiTableHead: {
                        root: {
                            background: caNhanHoaCaNhan.content.mauTableHeader, // màu table header
                        },
                    },

                    MuiTablePagination: {
                        toolbar: {
                            background: caNhanHoaCaNhan.content.mauTableFooter, // màu table footer
                        },
                    },
                    MuiInputBase: {
                        root: {
                            // background: caNhanHoaCaNhan.content.background, // Màu input
                            "label + &": {
                                marginTop: 3,
                            },
                        },
                        input: {
                            fontSize: "12px",
                            borderRadius: 4,
                            position: "relative",
                            // background: caNhanHoaCaNhan.content.background, // Màu input search
                            background: "white", // Màu input search
                            border: "1px solid #ced4da",
                            // fontSize: 14,
                            width: "100%",
                            padding: "8px 10px",
                            // marginLeft: "8px",
                            "&:focus": {
                                outline: "none",
                                borderRadius: 4,
                                borderColor: "#80bdff",
                            },
                            fontFamily,
                            "&[aria-invalid=true]": {
                                border: "1px solid #dc3545",
                            },
                            // "&:invalid": {
                            //     border: "1px solid #dc3545",
                            // },
                        },
                        inputMultiline: {
                            padding: "8px 10px",
                        },
                    },
                    MuiInputLabel: {
                        root: {
                            // paddingLeft: 10,
                            paddingBottom: 5,
                            position: "initial",
                            textAlign: "left",
                            transform: "none",
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#7F7F7F", // theme.palette.text.primary
                            fontFamily,
                            "&.Mui-focused": {
                                color: "#7F7F7F", // theme.palette.text.primary
                            },
                            "& .MuiFormLabel-asterisk.MuiInputLabel-asterisk": {
                                color: "red",
                                "&::before": {
                                    content: '"("',
                                    marginRight: -3,
                                },
                                "&::after": {
                                    content: '")"',
                                },
                                paddingLeft: 5,
                            },
                            "&& + *": {
                                // override initial styles
                                // label + .MuiInput-formControl
                                marginTop: 3,
                            },
                        },
                        shrink: {
                            transition: "none",
                            transform: "none",
                            color: "#7F7F7F",
                        },

                        formControl: {
                            transform: "none",
                            position: "initial",
                            // padding: 8,
                        },
                        animated: {
                            transition: "none",
                        },
                    },
                    MuiFormHelperText: {
                        root: {
                            fontFamily,
                            // paddingLeft: 8,
                            color: helperTextColor,
                            lineHeight: "19.2px",
                            marginTop: 3 / 2,
                            fontSize: "11px",
                            "&.-valid": {
                                color: validColor,
                            },
                            "&.-error": {
                                color: errorColor,
                            },
                        },
                    },
                    MuiNativeSelect: {
                        select: {
                            borderRadius: 4,
                            // background: caNhanHoaCaNhan.content.background, // Màu input select
                            "&:focus": {
                                borderRadius: 4,
                            },
                        },
                    },
                    MuiSelect: {
                        select: {
                            borderRadius: 4,
                            // background: caNhanHoaCaNhan.content.background, // Màu input select
                            "&:focus": {
                                borderRadius: 4,
                            },
                        },
                    },
                    MuiButton: {
                        text: {
                            textTransform: "none",
                        },
                        label: {
                            fontSize: "12px",
                            textTransform: "none",
                        },
                        containedPrimary: {
                            boxShadow: "none",
                            "&:hover": {
                                backgroundColor: "#367fa9",
                                boxShadow: "none",
                            },
                        },
                        textPrimary: {
                            boxShadow: "none",
                            "&:hover": {
                                boxShadow: "none",
                            },
                        },
                        contained: {
                            boxShadow: "none",
                            "&:hover": {
                                boxShadow: "none",
                            },
                        },
                    },
                    MuiTypography: {
                        body1: {
                            fontSize: 12,
                        },
                    },
                    MuiTableCell: {
                        root: {
                            fontSize: 12,
                        },
                        head: {
                            color: caNhanHoaCaNhan.content.mauTextTable,
                        },
                        body: {
                            color: caNhanHoaCaNhan.content.mauTextTable,
                        },
                    },
                    MuiSwitch: {
                        thumb: {
                            color: "#fff",
                        },
                    },
                },
            } as any);
        }
    }, [caNhanHoaHeThong, caNhanHoaCaNhan]);

    const themeDark = createTheme(
        {
            palette: {
                primary: {
                    main: "#367fa9",
                },
                background: {
                    paper: "#aaa", // Màu table
                },
                text: {
                    primary: "#FFF",
                },
                success: {
                    main: "#aaa",
                },
            },
            overrides: {
                MuiPaper: {
                    outlined: {
                        background: "#aaa",
                    },
                },
                MuiTableHead: {
                    root: {
                        background: "#FFF", // màu table header
                    },
                },

                MuiTablePagination: {
                    toolbar: {
                        background: "#aaa", // màu table footer
                    },
                },
                MuiInputBase: {
                    root: {
                        background: "#aaa", // Màu input
                        "label + &": {
                            marginTop: 3,
                        },
                    },
                    input: {
                        fontSize: "12px",
                        borderRadius: 4,
                        position: "relative",
                        background: "#aaa", // Màu input search
                        border: "1px solid #ced4da",
                        // fontSize: 14,
                        width: "100%",
                        padding: "8px 10px",
                        // marginLeft: "8px",
                        "&:focus": {
                            outline: "none",
                            borderRadius: 4,
                            borderColor: "#80bdff",
                        },
                        fontFamily,
                        "&[aria-invalid=true]": {
                            border: "1px solid #dc3545",
                        },
                        // "&:invalid": {
                        //     border: "1px solid #dc3545",
                        // },
                    },
                    inputMultiline: {
                        padding: "8px 10px",
                    },
                },
                MuiInputLabel: {
                    root: {
                        // paddingLeft: 10,
                        paddingBottom: 5,
                        position: "initial",
                        textAlign: "left",
                        transform: "none",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#7F7F7F", // theme.palette.text.primary
                        fontFamily,
                        "&.Mui-focused": {
                            color: "#7F7F7F", // theme.palette.text.primary
                        },
                        "& .MuiFormLabel-asterisk.MuiInputLabel-asterisk": {
                            color: "red",
                            "&::before": {
                                content: '"("',
                                marginRight: -3,
                            },
                            "&::after": {
                                content: '")"',
                            },
                            paddingLeft: 5,
                        },
                        "&& + *": {
                            // override initial styles
                            // label + .MuiInput-formControl
                            marginTop: 3,
                        },
                    },
                    shrink: {
                        transition: "none",
                        transform: "none",
                        color: "#7F7F7F",
                    },

                    formControl: {
                        transform: "none",
                        position: "initial",
                        // padding: 8,
                    },
                    animated: {
                        transition: "none",
                    },
                },
                MuiFormHelperText: {
                    root: {
                        fontFamily,
                        // paddingLeft: 8,
                        color: helperTextColor,
                        lineHeight: "19.2px",
                        marginTop: 3 / 2,
                        fontSize: "11px",
                        "&.-valid": {
                            color: validColor,
                        },
                        "&.-error": {
                            color: errorColor,
                        },
                    },
                },
                MuiNativeSelect: {
                    select: {
                        borderRadius: 4,
                        background: "#aaa", // Màu input select
                        "&:focus": {
                            borderRadius: 4,
                        },
                    },
                },
                MuiSelect: {
                    select: {
                        borderRadius: 4,
                        background: "#aaa", // Màu input select
                        "&:focus": {
                            borderRadius: 4,
                        },
                    },
                },
                MuiButton: {
                    text: {
                        textTransform: "none",
                    },
                    label: {
                        fontSize: "12px",
                        textTransform: "none",
                    },
                    containedPrimary: {
                        boxShadow: "none",
                        "&:hover": {
                            backgroundColor: "#367fa9",
                            boxShadow: "none",
                        },
                    },
                    textPrimary: {
                        boxShadow: "none",
                        "&:hover": {
                            boxShadow: "none",
                        },
                    },
                    contained: {
                        boxShadow: "none",
                        "&:hover": {
                            boxShadow: "none",
                        },
                    },
                },
                MuiTypography: {
                    body1: {
                        fontSize: 12,
                    },
                },
                MuiTableCell: {
                    root: {
                        fontSize: 12,
                    },
                    head: {
                        color: "#FFF",
                    },
                    body: {
                        color: "#FFF",
                    },
                },
                MuiSwitch: {
                    thumb: {
                        color: "#fff",
                    },
                },
            },
        },
        { index: 1 }
    );

    // const test = createTheme(theme);

    // React.useEffect(() => {
    //     // setTheme(themeDark);
    //     setTheme(themeLight);
    // }, []);

    return (
        <ThemeProvider theme={createTheme(theme)}>
            <StylesProvider injectFirst>{children}</StylesProvider>
        </ThemeProvider>
    );
};

export default ProviderTheme;
