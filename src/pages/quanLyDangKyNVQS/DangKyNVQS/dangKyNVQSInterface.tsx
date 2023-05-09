import React from "react";

export interface NVQS_DTO {
    name: string;
    trangThai: string;
    gioiTinh: string;
    diaChi: string;
    noiSinh: string;
    ghichu: string;
    ngaySinh: Date;
}

export const initData: NVQS_DTO = {
    name: "",
    trangThai: "",
    gioiTinh: "",
    diaChi: "",
    noiSinh: "",
    ghichu: "",
    ngaySinh: new Date(),
};

export type IContextDK_NVQS = {
    data: NVQS_DTO[];
    handleChangePage: () => void;
    handleSave: (data: NVQS_DTO) => void;
    handleSearch: (value: string) => void;
};

export const DangKyNVQSContext = React.createContext<IContextDK_NVQS>({
    data: [],
    handleChangePage: () => {},
    handleSave: () => {},
    handleSearch: () => {},
});
