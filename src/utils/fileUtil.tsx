export function createFileType(type: string | String) {
    let fileType = "";
    if (type == "pdf") {
        fileType = `application/${type}`;
    } else if (type == "doc") {
        fileType = "application/msword";
    } else if (type == "docx") {
        fileType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    } else if (type == "xls") {
        fileType = "application/vnd.ms-excel";
    } else if (type == "xlsx") {
        fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    }
    return fileType;
}

export function createFileTypeFromDownloadType(type: string | String) {
    let fileType = "";
    if (type == "PDF") {
        fileType = `application/pdf`;
    } else if (type == "MSWORD") {
        fileType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    } else if (type == "EXCEL") {
        fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    }
    return fileType;
}

export function downLoadFile(data: any, typeFile: string, fileName: string) {
    let type = createFileTypeFromDownloadType(typeFile);
    const blob = new Blob([data], { type: type });
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;
    a.style.display = "none";
    document.body.appendChild(a);
    if (type == "application/pdf") {
        const pdfWindow = window.open();
        if (pdfWindow) {
            pdfWindow.location.href = a.href;
        }
    } else {
        a.click();
    }
    a.remove();
}
