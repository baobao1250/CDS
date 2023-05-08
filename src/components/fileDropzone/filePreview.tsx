import { Box, Button, IconButton } from "@mui/material";
import React from "react";
import { AttachIcon } from "./fileTooltip";
import { FileDTO } from "./interface";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GetAppIcon from "@mui/icons-material/GetApp";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

interface PreFilePreviewProps {
  files: FileDTO[];
  onDelete: (f: FileDTO) => void;
  onDownload: (f: FileDTO) => void;
}

const ServerFilePreview: React.FC<PreFilePreviewProps> = ({
  files,
  onDelete,
  onDownload,
}) => {
  return (
    <>
      {files.map((item, i) => {
        if (item.isDeleted) return null;
        return (
          <Box
            key={i}
            display="flex"
            sx={{
              width: "100%",
              justifyContent: "space-between",
              marginBottom: 1,
            }}
          >
            <Box display="flex" flexGrow="1" flexDirection="column" key={i}>
              <Button
                size="small"
                disableRipple
                startIcon={<AttachIcon fileName={`${item.name}`} />}
                style={{
                  display: "flex",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%",
                  whiteSpace: "nowrap",
                }}
                endIcon={item.docId && <GetAppIcon fontSize="small" />}
                onClick={() => onDownload(item)}
              >
                {item.name.length > 30
                  ? item.name.slice(0, 33) + "..." + item.name.slice(40 + 1)
                  : item.name}
              </Button>
            </Box>

            <IconButton
              onClick={() => onDelete(item)}
              size="small"
              disableRipple
              color="secondary"
            >
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
        );
      })}
    </>
  );
};

export default ServerFilePreview;

interface FilePreviewProps {
  files: FileDTO[];
  onDelete: (f: FileDTO) => void;
  onDownload: (f: FileDTO) => void;
  disabled?: boolean;
}

export const FilePreview: React.FC<FilePreviewProps> = ({
  files,
  onDelete,
  onDownload,
  disabled
}) => {
  return (
    <>
      {files.map((item, key) => {
        return (
          !item.isDeleted && (
            <Box
              display="flex"
              key={key}
              sx={{
                width: "100%",
                justifyContent: "space-between",
                marginBottom: 1,
              }}
            >
              <Button
                size="small"
                disableRipple
                startIcon={<AttachIcon fileName={item.name} />}
                onClick={() => onDownload(item)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#2196f3",
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
                  {item.name}
                </Box>
              </Button>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <IconButton
                  onClick={() => onDownload(item)}
                  size="small"
                  disableRipple
                  color="primary"
                >
                  <DownloadRoundedIcon fontSize="small" />
                </IconButton>
                <IconButton
                  disabled={disabled}
                  onClick={() => onDelete(item)}
                  size="small"
                  disableRipple
                  color="error"
                >
                  <CloseRoundedIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          )
        );
      })}
    </>
  );
};
