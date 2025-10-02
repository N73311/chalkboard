import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import "./Chalkboard.styles.scss";
import Header from "../Header/Header";
import ToolPalette from "../ToolPalette/ToolPalette";
import UserPalette from "../UserPalette/UserPalette";

const Chalkboard = ({ socket }) => {
  const [color, setColor] = useState("#fff");
  const [tool, setTool] = useState("BRUSH");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Set up socket listener for initial user list
    const handleUserList = (userList) => {
      setUsers(userList);
    };

    // Set up socket listener for new users
    const handleNewUser = (data) => {
      setUsers(prevUsers => {
        if (prevUsers.indexOf(data) === -1) {
          return [...prevUsers, data];
        }
        return prevUsers;
      });
    };

    socket.on("user-list", handleUserList);
    socket.on("new-user", handleNewUser);

    // Cleanup socket listeners on unmount
    return () => {
      socket.off("user-list", handleUserList);
      socket.off("new-user", handleNewUser);
    };
  }, [socket]);

  const setup = (p5, parent) => {
    const [width, height] = getCanvasSize();
    p5.createCanvas(width, height).parent(parent);
    p5.background(25);
    p5.noErase();

    socket.on("line", (data) => {
      p5.stroke(data.drawColor);
      p5.smooth();
      p5.strokeWeight(data.drawWeight);
      p5.line(data.x1, data.y1, data.x2, data.y2);
    });

    socket.on("circle", (data) => {
      p5.noStroke();
      p5.fill(data.color);
      p5.ellipse(data.x, data.y, 50, 50);
    });

    socket.on("square", (data) => {
      p5.noStroke();
      p5.fill(data.color);
      p5.rect(data.x - 25, data.y - 25, 50, 50);
    });
  };

  const getCanvasSize = () => {
    const canvasDiv = document.getElementById("root");
    const toolPalette = document.querySelector(".tool-palette");
    const userPalette = document.querySelector(".user-palette");
    const header = document.querySelector(".header");
    const width =
      canvasDiv.offsetWidth - toolPalette.offsetWidth - userPalette.offsetWidth;
    const height = canvasDiv.offsetHeight - header.offsetHeight;
    return [width, height];
  };

  const mouseClicked = (p5) => {
    switch (tool) {
      case "CIRCLE":
        p5.noStroke();
        p5.fill(color);
        p5.ellipse(p5.mouseX, p5.mouseY, 50, 50);
        socket.emit("circle", {
          color,
          x: p5.mouseX,
          y: p5.mouseY,
        });
        break;

      case "SQUARE":
        p5.noStroke();
        p5.fill(color);
        p5.rect(p5.mouseX - 25, p5.mouseY - 25, 50, 50);
        socket.emit("square", {
          color,
          x: p5.mouseX,
          y: p5.mouseY,
        });
        break;
      default:
        break;
    }
  };

  const mouseDragged = (p5) => {
    if (p5.mouseIsPressed && (tool === "ERASE" || tool === "BRUSH")) {
      let drawColor = color;
      let drawWeight = 4;

      if (tool === "ERASE") {
        drawColor = 25;
        drawWeight = 25;
      }

      p5.stroke(drawColor);
      p5.strokeWeight(drawWeight);
      p5.smooth();
      p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
      socket.emit("line", {
        drawColor,
        drawWeight,
        x1: p5.mouseX,
        y1: p5.mouseY,
        x2: p5.pmouseX,
        y2: p5.pmouseY,
      });
    }
  };

  const handleToolClick = (tool) => {
    setTool(tool);
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  return (
    <div className="workspace">
      <Header />

      <ToolPalette
        activeTool={tool}
        handleColorChange={handleColorChange}
        handleToolClick={handleToolClick}
      />
      <div className="sketch">
        <Sketch
          className="sketch"
          setup={setup}
          mouseDragged={mouseDragged}
          mouseClicked={mouseClicked}
        />
      </div>
      <UserPalette users={users} />
    </div>
  );
};

export default Chalkboard;
