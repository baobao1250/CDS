import Button from "@material-ui/core/Button";
import React, { ChangeEvent } from "react";
import { IInputProps } from "react-dropzone-uploader/dist/Dropzone";

interface IInputCustom extends IInputProps {
    acceptFiles: String;
}

const InputCustom: React.FC<IInputCustom> = ({ onFiles, getFilesFromEvent, acceptFiles }) => {
    async function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const data = await getFilesFromEvent(event);
        onFiles(data);
    }
    return (
        <>
            <input accept={`${acceptFiles}`} hidden={true} id="contained-button-file" type="file" multiple={true} onChange={handleChange} />
            <label htmlFor="contained-button-file">
                <Button variant="outlined" size="small" color="default" component="span" disableElevation style={{ marginRight: "10px" }}>
                    Chọn tập tin
                </Button>
            </label>
        </>
    );
};

export default InputCustom;
