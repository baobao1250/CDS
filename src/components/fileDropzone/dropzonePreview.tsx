import {
  Box,
  Button,
  CircularProgress,
  Fade,
  IconButton,
  LinearProgress,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RefreshIcon from "@mui/icons-material/Refresh";
import React from "react";
import { IPreviewProps } from "react-dropzone-uploader/dist/Dropzone";
import { AttachIcon } from "./fileTooltip";

export const DropzonePreview = ({ fileWithMeta, meta }: IPreviewProps) => {
  const { name, percent, status } = meta;

  function handleCancelFile() {
    fileWithMeta.cancel();
    fileWithMeta.remove();
  }

  return (
    <Box
      display="flex"
      sx={{
        width: "100%",
        justifyContent: "space-between",
        marginBottom: 1,
      }}
    >
      <Button
        size="small"
        disabled={status === "exception_upload"}
        disableRipple
        startIcon={<AttachIcon fileName={name} />}
        onClick={() =>
          status === "done" ? console.log("download") : handleCancelFile()
        }
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: status === "done" ? "#2196f3" : "red",
        }}
      >
        <Box
          sx={{
            textTransform: "none",
            marginRight: "auto",
            marginLeft: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </Box>
      </Button>

      {percent < 100 &&
        status !== "error_upload" &&
        status !== "exception_upload" && (
          <Box marginBottom={1} width="100%">
            <LinearProgress variant="determinate" value={Math.round(percent)} />
          </Box>
        )}
      {status !== "error_upload" && (
        <Box marginTop={0.7}>
          <Fade
            in={status !== "done"}
            unmountOnExit
            style={{
              transitionDelay: status !== "done" ? "100ms" : "0ms",
            }}
          >
            <CircularProgress size={20} />
          </Fade>
        </Box>
      )}
      {percent === 100 && status === "done" && (
        <IconButton
          onClick={fileWithMeta.remove}
          size="small"
          disableRipple
          color="error"
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      )}
      {status === "error_upload" && (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            onClick={fileWithMeta.remove}
            size="small"
            disableRipple
            color="secondary"
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={fileWithMeta.restart}
            size="small"
            disableRipple
            color="primary"
          >
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
