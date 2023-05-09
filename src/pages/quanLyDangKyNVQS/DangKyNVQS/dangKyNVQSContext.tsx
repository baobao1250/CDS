import React, { useEffect, useRef, useState } from "react";
import { DangKyNVQSContext, NVQS_DTO } from "./dangKyNVQSInterface";
import QuanLyDangKyNVQS from ".";
import TinhTrangXuLy from "./danhSach";
import { useForm } from "react-hook-form";

export interface DangKyNVQSProviderProps {}

const DangKyNVQSProvider: React.FC<DangKyNVQSProviderProps> = () => {
    const [page, setpage] = React.useState<boolean>(false);
    const [data, setData] = React.useState<NVQS_DTO[]>([]);
    const typingTimeout = useRef<any>(null);

    const handleChangePage = () => {
        setpage(!page);
    };

    const handleSave = (newData: NVQS_DTO) => {
        setData([...data, newData]);
        setpage(!page);
    };

    const handleSearch = (e: string) => {
        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current);
        }

        typingTimeout.current = setTimeout(() => {
            let newData = data.filter((p) => p.name.toUpperCase().includes(e.toUpperCase()));
            setData(newData);
        }, 500);
    };

    return (
        <DangKyNVQSContext.Provider
            value={{
                data,
                handleChangePage,
                handleSave,
                handleSearch,
            }}
        >
            {page ? <QuanLyDangKyNVQS /> : <TinhTrangXuLy />}
        </DangKyNVQSContext.Provider>
    );
};

export default DangKyNVQSProvider;
