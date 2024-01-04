import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { saveCanvas, toJSON } from "../../helpers";
import { Tooltip } from "@mui/material";
import Mpopover from "../ReUsable/Mpopover";
import ConvertData from "../FlowComponents/ConverData";
import ClearAllIcon from "@mui/icons-material/ClearAll";
const Layout = ({
  flowImageDownloadRef,
  children,
  jsonInput,
  setJsonInput,
  edges,
  nodes,
  convert,
  setEdges,
  setNodes,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorClrEl, setanchorClrEl] = React.useState(null);
  const handleClrClick = (event) => {
    setanchorClrEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClrClose = () => {
    setanchorClrEl(null);
  };
  const handleRemoveAllNodes = () => {
    setEdges([]);
    setNodes([]);
    handleClrClose();
  };
    console.log("🚀 ~ file: index.jsx:44 ~ handleRemoveAllNodes ~ setNodes:", setNodes)

  const open = Boolean(anchorEl);
  const openToClear = Boolean(anchorClrEl);
  const id = open ? "simple-popover" : undefined;

  const renderPopover = () => {
    return (
      <Mpopover open={open} anchorEl={anchorEl} onClose={handleClose} id={id}>
        <ConvertData
          jsonInput={jsonInput}
          setJsonInput={setJsonInput}
          convert={convert}
        />
      </Mpopover>
    );
  };
  const renderClearPopover = () => {
    return (
      <Mpopover
        open={openToClear}
        anchorEl={anchorClrEl}
        onClose={handleClrClose}
        id={id}
      >
        <Box p="40px">
          <h1>Are you sure you want to clear the canvas?</h1>
          <Box mt="20px">
            <Button
              variant="outlined"
              onClick={handleRemoveAllNodes}
              color="error"
              style={{ marginRight: "10px" }}
            >
              Yes
            </Button>
            <Button variant="outlined" onClick={handleClrClose} color="primary">
              No
            </Button>
          </Box>
        </Box>
      </Mpopover>
    );
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {open && renderPopover()}
          {openToClear && renderClearPopover()}
          <Box mr="8px">
            <Tooltip
              title={`Download as an Image/png`}
              placement="bottom"
              arrow
            >
              <Button
                variant="outlined"
                onClick={() => saveCanvas(flowImageDownloadRef)}
                color="inherit"
              >
                <FileDownloadIcon />
              </Button>
            </Tooltip>
          </Box>
          <Box mr="8px">
            <Tooltip
              title={`Clear all data from the canvas`}
              placement="bottom"
              arrow
            >
              <Button
                variant="outlined"
                onClick={handleClrClick}
                color="inherit"
              >
                <ClearAllIcon />
              </Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};
export default Layout;
