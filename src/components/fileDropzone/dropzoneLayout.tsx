import { Box } from "@mui/material";
import React from "react";
import { ILayoutProps } from "react-dropzone-uploader/dist/Dropzone";

interface DropzoneLayoutProps extends ILayoutProps {
  acceptFileTypes: String;
  multiple: boolean;
}

const DropzoneLayout: React.FC<DropzoneLayoutProps> = (props) => {
  const { previews, input, dropzoneProps, acceptFileTypes, multiple } = props;

  return (
    <>
      <Box>
        {previews}
        <Box
          {...dropzoneProps}
          sx={{
            marginTop: "5px",
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            borderWidth: "2px",
            borderRadius: "2px",
            borderStyle: "dashed",
            backgroundColor: "#fafafa",
            color: "#bdbdbd",
            outline: "none",
          }}
        >
          <Box component="span" fontSize="13px" mb="5px">
            Kéo và thả tập tin ({acceptFileTypes}) vào đây hoặc
          </Box>
          <Box sx={{ marginLeft: 8 }}>{multiple && input}</Box>
        </Box>
      </Box>
    </>
  );
};

export default DropzoneLayout;
