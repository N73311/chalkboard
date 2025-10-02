// IMPORT MODULES
const socket = require("socket.io");

//!LISTENER FOR UNCAUGHT EXCEPTIONS
// Safety net in case exceptions are not caught explicitly
process.on("uncaughtException", (err) => {
  console.log(err);
  console.log(err.name, err.message);
  console.log("UNHANDLED EXCEPTION! Shutting Down...");
  process.exit(1);
});

const app = require("./app");

const userCache = [];

app.get("/users", (req, res) => {
  res.status(200).send(userCache);
});

setInterval(() => {
  if (userCache.length > 0) {
    userCache.shift();
  }
}, 60000);

// START SERVER
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});

// Setup Socket IO Connection with CORS
const io = socket(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001", "https://chalkboard.zachayers.io"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.sockets.on("connection", (socket) => {
  const newUser = socket.handshake.query["username"];
  userCache.push(newUser);

  // Send the current user list including the new user to the connecting client
  socket.emit("user-list", userCache);

  // Notify all other users about the new user
  socket.broadcast.emit("new-user", newUser);

  // Watch for incoming socket connection mouse events
  socket.on("line", (data) => {
    socket.broadcast.emit("line", data);
  });

  socket.on("circle", (data) => {
    socket.broadcast.emit("circle", data);
  });

  socket.on("square", (data) => {
    socket.broadcast.emit("square", data);
  });
});

//!LISTENER FOR UNHANDLED REJECTIONS
// Safety net in case promise rejections are not caught explicitly
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting Down...");
  server.close(() => {
    process.exit(1);
  });
});

//!LISTENER FOR SIGTERM SIGNAL
process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED! Shutting Down");
  server.close(() => {
    console.log("PROCESS TERMINATED!");
    //Sigterm shuts down the program here
  });
});
