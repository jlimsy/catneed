// ===== REQUIRE BLOCK ===== //
const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("catneed:server");

//* Chat
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

//* Database
require("dotenv").config();
require("./config/database");

const app = express();

//* Chat
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

// ===== MIDDLEWARE ===== //
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
// app.use(require("./config/checkToken"));

// ===== ROUTES ===== //

app.use("/api/users", require("./routes/api/usersRouter"));
app.use("/api/donate", require("./routes/api/donateRouter"));
app.use("/api/request", require("./routes/api/requestRouter"));
app.use("/api/postal", require("./routes/api/postalRouter"));
app.use("/api/chats", require("./routes/api/chatRouter"));
app.use("/api/messages", require("./routes/api/messageRouter"));

app.use("/api/test", require("./routes/api/testRouter"));

app.use("/api/image", require("./routes/api/imagesRouter"));

//! Catch all route
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ===== LISTEN BLOCK ===== //
const port = process.env.PORT || 3000;

// io.on("connection", (socket) => {
//   // console.log("a user connected");
//   socket.on("send-message", (data) => {
//     socket.broadcast.emit("message-from-server", data);
//     console.log("message received from client", data);
//   });

//   socket.on("disconnect", (socket) => {
//     console.log("User left.");
//   });
// });

server.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
