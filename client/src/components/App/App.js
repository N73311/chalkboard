import React, { useState } from "react";
import Chalkboard from "../Chalkboard/Chalkboard";
import Dialog from "../Dialog/Dialog";
import openSocket from "socket.io-client";

function App() {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState("User " + Math.random().toFixed(2));

  if (open === true) {
    return (
      <Dialog
        open={open}
        setOpen={setOpen}
        username={username}
        setUsername={setUsername}
      />
    );
  } else {
    // Always use the same origin since the server serves both the app and socket.io
    const socket = openSocket(window.location.origin, {
      query: `username=${username}`,
    });

    return <Chalkboard socket={socket} />;
  }
}

export default App;
