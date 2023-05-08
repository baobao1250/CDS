import { Button, InputBase, InputLabel, Typography } from "@material-ui/core";
import CircularProgress from '@mui/material/CircularProgress';
import { AttachFileService } from "apis/attachFile/attachFileService";
import { AttachFileDTO, AttachFileInteface } from "models/attachFileDTO";
import { File } from "models/File";

import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { BaseResponse } from "../../../apis/baseService";

export interface CellUploadProps {
    callbackUploadFile: (res: BaseResponse, index: number) => void;
    index: number;
    isEdit?: boolean;
   
}

const CellUpload: React.FC<CellUploadProps> = ({  index, isEdit,callbackUploadFile}) => {

     const [file, setFile] = useState<File[]>([]);
    const [progress, setProgress] = useState(0);

    function onUploadProgress(data: any): void {
        setProgress(Math.round((100 * data.loaded) / data.total));
        console.log(progress);
    }

    console.log(file);
    return (
        <>
            <input
                disabled={!Boolean(isEdit)}
                accept="image/*,.doc,.docx,.xls,.xlsx,.pdf,.jasper*"
                id={`contained-button-file-${index}`}
                type="file"
              hidden
                onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                   try {
                    if (e.target.files !== null) {
                        const files = e.target.files;
                        await new AttachFileService().uploadFile(files,onUploadProgress).then((res) => {
                                setFile(prev => [...prev, res.data])
                                callbackUploadFile(res,index);
                        });
                    }
                   } catch(err) {
                    console.log(err)
                   }
                }}
            />
            <label htmlFor={`contained-button-file-${index}`}>
                <Button disabled={!Boolean(isEdit)} variant="contained" color="primary" component="span" size="small">    
                    Chọn file
                </Button>      
                {file.map(item =>(
                    <li  >       
                         <Typography variant="overline">{item.fileName} - {progress}</Typography>
                    </li>    
                   
                    
                ))}
            </label>
        </>
    );
};

export default CellUpload;
