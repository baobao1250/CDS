import { Box, Grid, InputLabel } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { CHUYEN_NGANH } from "constants/constants";
import { getSiteDefault, getToken, getUserId } from "helpers/localStorage";
import { AttachFileDTO } from "models/attachFileDTO";
import React from "react";
import Dropzone from "react-dropzone-uploader";
import { IFileWithMeta } from "react-dropzone-uploader/dist/Dropzone";
import LayoutDrop from "../layoutDropZone/layoutDrop";
import { PreviewDropZone } from "../layoutDropZone/previewDropZone";
import PreviewDropzoneFromServer from "../previewFileFromServer/previewFileFromServer";
import InputCustom from "./inputCustom";

interface IDropZoneCustom {
    acceptFiles: String;
    attachFileServer: AttachFileDTO[];
    url: String;
    isView?: boolean;
    handleChangeStatus: (file: IFileWithMeta) => void;
    handleDeleteFileServer: (file: AttachFileDTO) => void;
    handleDownloadFile: (file: AttachFileDTO) => void;

}


const DropZoneCustom: React.FC<IDropZoneCustom> = ({
    acceptFiles,
    attachFileServer,
    url,
    isView,
    handleDeleteFileServer,
    handleChangeStatus,
    handleDownloadFile,

    
}) => {
    const TOKEN = getToken();
    return (
        <>
            <Grid item xs={12} />
            <Grid item xs={3} className="grid-item">
                <InputLabel>Đính kèm</InputLabel>
            </Grid>
            <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
                <Box>
                    {attachFileServer && (
                        <Box width="30vw">
                            <PreviewDropzoneFromServer
                                isView={isView}
                                files={attachFileServer}
                                onDelete={handleDeleteFileServer}
                                onDownload={handleDownloadFile}
                            />
                        </Box>
                    )}
                    <Box width="30vw">
                        <Dropzone
                            accept={`${acceptFiles}`}
                            inputContent={
                                <Button
                                    variant="outlined"
                                    size="small"
                                    color="default"
                                    component="span"
                                    disabled={isView}
                                    disableElevation
                                    style={{ marginRight: "10px" }}
                                >
                                    Chọn tập tin
                                </Button>
                            }
                            disabled={isView}
                            multiple={true}
                            getUploadParams={(file: IFileWithMeta) => {
                                const formData = new FormData();
                                const userId = getUserId();
                                formData.append("file", file.file);
                                formData.append("userId", `${userId}`);
                              
                                return {
                                    url: `${url}`,
                                    headers: { Authorization: `Bearer ${TOKEN}`, maHeThong: getSiteDefault(), "csrf-token": "ABC" },
                                    body: formData,
                                };
                            }}
                            onChangeStatus={handleChangeStatus}
                            //  InputComponent={(props: any) => <InputCustom acceptFiles={`${acceptFiles}`} {...props} />}
                            LayoutComponent={(props: any) => <LayoutDrop {...props} acceptFiles={acceptFiles} />}
                            PreviewComponent={(props: any) => <PreviewDropZone {...props} />}
                        />
                        
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={3}></Grid>
            
        </>
        
    );
    
};

export default DropZoneCustom;
