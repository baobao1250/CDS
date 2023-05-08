import { Box, Button, Grid } from "@mui/material";
import React from "react";
import Dropzone from "react-dropzone-uploader";
import { IFileWithMeta } from "react-dropzone-uploader/dist/Dropzone";
import DropzoneLayout from "./dropzoneLayout";
import { DropzonePreview } from "./dropzonePreview";
import { FilePreview } from "./filePreview";
import { FileDTO } from "./interface";

export const URL_UPLOAD_FILE = `/`;
export const URL_UPLOAD_FILE_NEW = `/`;
export const URL_DOWNLOAD_FILE_NEW = `/`;

interface FileDropzoneProps {
    attachedFiles: FileDTO[];
    handleChangeStatus: (file: IFileWithMeta) => void;
    handleDownloadFile: (file: FileDTO) => void;
    handleDeleteFile: (file: FileDTO) => void;
    multiple?: boolean;
    fileFormat?: string;
    style?: React.CSSProperties;
    sx?: number;
    width?: any;
    disabled?: boolean;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
    attachedFiles,
    handleDeleteFile,
    handleChangeStatus,
    handleDownloadFile,
    multiple,
    fileFormat,
    style,
    sx,
    width,
    disabled,
}) => {
    const FILE_FORMAT = "image/*,.doc,.docx,.xls,.xlsx,.pdf";

    const urlUploadFile = URL_UPLOAD_FILE_NEW;

    return (
        <>
            <Grid item xs={sx ? sx : 6} style={style ? style : { display: "flex", justifyContent: "center", maxWidth: "100%" }}>
                <Box>
                    {attachedFiles && (
                        <Box width={width ? width : "30vw"}>
                            <FilePreview
                                disabled={disabled}
                                files={attachedFiles}
                                onDelete={handleDeleteFile}
                                onDownload={handleDownloadFile}
                            />
                        </Box>
                    )}
                    <Box width={width ? width : "30vw"}>
                        <Dropzone
                            disabled={disabled}
                            accept={fileFormat != undefined && fileFormat != null ? fileFormat : FILE_FORMAT}
                            inputContent={""}
                            inputWithFilesContent={""}
                            multiple={multiple != undefined && multiple != null ? multiple : true}
                            getUploadParams={(file: IFileWithMeta) => {
                                const formData = new FormData();
                                formData.append("files", file.file);
                                formData.append("userId", "");
                                formData.append("loaiVanBan", "loaiVanBan");
                                return {
                                    url: URL_UPLOAD_FILE,
                                    headers: {
                                        // Authorization: `Bearer ${getToken()}`,
                                        "csrf-token": "ABC",
                                    },
                                    body: formData,
                                };
                            }}
                            onChangeStatus={handleChangeStatus}
                            LayoutComponent={(props: any) => (
                                <DropzoneLayout
                                    {...props}
                                    multiple={true}
                                    acceptFileTypes={fileFormat != undefined && fileFormat != null ? fileFormat : FILE_FORMAT}
                                />
                            )}
                            PreviewComponent={(props: any) => <DropzonePreview {...props} />}
                        />
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={3}></Grid>
        </>
    );
};

export default FileDropzone;
