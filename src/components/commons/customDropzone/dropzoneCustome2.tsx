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

interface IDropZoneCustom {
    acceptFiles: String;
    attachFileServer: AttachFileDTO[];
    url: String;
    handleChangeStatus: (file: IFileWithMeta) => void;
    handleDeleteFileServer: (file: AttachFileDTO) => void;
    handleDownloadFile: (file: AttachFileDTO) => void;
    chuyenNganh: CHUYEN_NGANH;
}

const DropZoneCustom2: React.FC<IDropZoneCustom> = ({
    acceptFiles,
    attachFileServer,
    url,
    handleDeleteFileServer,
    handleChangeStatus,
    handleDownloadFile,
    chuyenNganh,
}) => {
    const TOKEN = getToken();
    return (
        <>
            <Grid item xs={12} />
            <Grid item xs={6} style={{ display: "flex", justifyContent: "center", maxWidth: "100%" }}>
                <Box>
                    {attachFileServer && (
                        <Box width="30vw">
                            <PreviewDropzoneFromServer files={attachFileServer} onDelete={handleDeleteFileServer} onDownload={handleDownloadFile} />
                        </Box>
                    )}
                    <Box width="30vw">
                        <Dropzone
                            accept={`${acceptFiles}`}
                            inputContent={
                                <Button variant="outlined" size="small" color="default" component="span" disableElevation style={{ marginRight: "10px" }}>
                                    Chọn tập tin
                                </Button>
                            }
                            multiple={true}
                            getUploadParams={(file: IFileWithMeta) => {
                                const formData = new FormData();
                                const userId = getUserId();
                                formData.append("file", file.file);
                                formData.append("userId", `${userId}`);
                                formData.append("chuyenNganh", chuyenNganh);
                                return {
                                    url: `${url}`,
                                    headers: { Authorization: `Bearer ${TOKEN}`, maHeThong: getSiteDefault(), "csrf-token": "ABC" },
                                    body: formData,
                                };
                            }}
                            onChangeStatus={handleChangeStatus}
                            // InputComponent={(props: any) => <InputCustom acceptFiles={`${acceptFiles}`} {...props} />}
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

export default DropZoneCustom2;
