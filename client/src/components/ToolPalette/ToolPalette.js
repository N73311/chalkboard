import React from "react";
import "./ToolPalette.styles.scss";
import { CirclePicker } from "react-color";
import { Button, Tooltip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faSquare, faPaintBrush, faEraser } from "@fortawesome/free-solid-svg-icons";

const ToolPalette = ({ handleColorChange, handleToolClick, activeTool }) => {
  return (
    <div className="tool-palette">
      <div className="color-picker">
        <CirclePicker onChange={handleColorChange} />
      </div>
      <div className="tool-picker">
        <div className="tool-picker__column">
          <Tooltip title="Circle" placement="top">
            <Button
              className="btn"
              variant="contained"
              color={activeTool === "CIRCLE" ? "secondary" : "primary"}
              onClick={() => handleToolClick("CIRCLE")}
            >
              <FontAwesomeIcon icon={faCircle} />
            </Button>
          </Tooltip>
          <Tooltip title="Square">
            <Button
              className="btn"
              variant="contained"
              color={activeTool === "SQUARE" ? "secondary" : "primary"}
              onClick={() => handleToolClick("SQUARE")}
            >
              <FontAwesomeIcon icon={faSquare} />
            </Button>
          </Tooltip>
        </div>
        <div className="tool-picker__column">
          <Tooltip title="Brush" placement="top">
            <Button
              className="btn"
              variant="contained"
              color={activeTool === "BRUSH" ? "secondary" : "primary"}
              onClick={() => {
                handleToolClick("BRUSH");
              }}
            >
              <FontAwesomeIcon icon={faPaintBrush} />
            </Button>
          </Tooltip>
          <Tooltip title="Erase">
            <Button
              className="btn"
              variant="contained"
              color={activeTool === "ERASE" ? "secondary" : "primary"}
              onClick={() => handleToolClick("ERASE")}
            >
              <FontAwesomeIcon icon={faEraser} />
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ToolPalette;
