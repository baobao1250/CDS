import { useEffect, useState } from "react";
import { IFileWithMeta } from "react-dropzone-uploader";
// import AXIOS_INSTANCE, { URL_DOWNLOAD_FILE, URL_DOWNLOAD_FILE_NEW, baseUrl } from "../api/axiosClient";
import { FileDTO } from "../components/fileDropzone/interface";

export const useDropzone = () => {
    // State
    const [files, setFiles] = useState<FileDTO[]>([]);

    // Control
    function handleChangeStatus(file: IFileWithMeta) {
        // console.log("log: dropzone changing status");
        if (file.xhr?.readyState === 4 && file.xhr.status === 200 && file.meta.status === "done") {
            let res = JSON.parse(file.xhr.response);
            if (res.result && res.result.length > 0) {
                let dto = res.result[0];
                setFiles((prevState) => [...prevState, { ...dto, alfrescoId: dto.docId }]);
            }
            file.remove();
        }
    }

    function handleDeleteFile(item: FileDTO) {
        // console.log("log: dropzone deleting file");
        setFiles((prev) => prev.filter((file) => file.docId !== item.docId));
    }

    async function handleDownloadFile(file: FileDTO) {
        // let urlDownloadFile = baseUrl + contextPath + URL_DOWNLOAD_FILE_NEW;
        // await AXIOS_INSTANCE.post(`${urlDownloadFile}`, file, {
        //     responseType: "blob",
        // }).then((res) => {
        //     let blob = new Blob([res.data], { type: res.data.type });
        //     let url = window.URL.createObjectURL(blob);
        //     let link = document.createElement("a");
        //     link.href = url;
        //     link.setAttribute("download", `${file.name}`);
        //     document.body.appendChild(link);
        //     link.click();
        //     link.remove();
        //     window.URL.revokeObjectURL(url);
        // });
    }

    async function handleDownloadFileDip(file: FileDTO) {
        // await new AttachFileService().downloadFileDip(file).then((res) => {
        //   let blob = new Blob([res.data], { type: res.data.type });
        //   let url = window.URL.createObjectURL(blob);
        //   let link = document.createElement("a");
        //   link.href = url;
        //   link.setAttribute("download", `${file.name}`);
        //   document.body.appendChild(link);
        //   link.click();
        //   link.remove();
        //   window.URL.revokeObjectURL(url);
        // });
    }

    function handleSetFiles(files: FileDTO[]) {
        setFiles(files);
    }

    return {
        files,
        handleSetFiles,
        handleChangeStatus,
        handleDownloadFile,
        handleDeleteFile,
    };
};
