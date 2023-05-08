import React, { useEffect, useRef, useState } from "react";
import { DangKyNVQSContext } from "./dangKyNVQSInterface";
import QuanLyDangKyNVQS from ".";

export interface DangKyNVQSProviderProps {}

const DangKyNVQSProvider: React.FC<DangKyNVQSProviderProps> = () => {
    // const Service = new Service();

   

    return (
        <DangKyNVQSContext.Provider value={{}}>
            <QuanLyDangKyNVQS />
        </DangKyNVQSContext.Provider>
    );
};

export default DangKyNVQSProvider;
