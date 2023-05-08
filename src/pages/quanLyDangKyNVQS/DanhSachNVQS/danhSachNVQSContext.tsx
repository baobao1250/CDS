import React, { useEffect, useRef, useState } from "react";
import { DanhSachNVQSContext } from "./danhSachNVQSInterface";
import TinhTrangXuLy from ".";

export interface DanhSachNVQSProviderProps {}

const DanhSachNVQSProvider: React.FC<DanhSachNVQSProviderProps> = () => {
    // const Service = new Service();

    return (
        <DanhSachNVQSContext.Provider value={{}}>
            <TinhTrangXuLy />
        </DanhSachNVQSContext.Provider>
    );
};

export default DanhSachNVQSProvider;
