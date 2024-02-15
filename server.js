// ===== REQUIRE BLOCK ===== //
const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("catneed:server");

//! ===== SOCKET ===== //
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

//* Database
require("dotenv").config();
require("./config/database");

const app = express();

//! ===== SOCKET ===== //
const server = createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
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
app.use("/api/chats", require("./routes/api/chatsRouter"));
app.use("/api/messages", require("./routes/api/messagesRouter"));

app.use("/api/test", require("./routes/api/testRouter"));

app.use("/api/image", require("./routes/api/imagesRouter"));

//! Catch all route
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ===== LISTEN BLOCK ===== //
const port = process.env.PORT || 3000;

//! ===== SOCKET ===== //
io.on("connection", (socket) => {
  console.log("connected to socket.io");
  //   // console.log("A user connected:", socket.id);
  socket.on("setup", (userData) => {
    socket.join(userData);
    console.log("userData", userData?._id);
    socket.emit("connected");
    // socket.broadcast.emit("message-from-server", data);
  });

  socket.on("join chat", (chatId) => {
    socket.join(chatId);
    console.log("User joined room" + chatId);
  });

  socket.on("new message", (newMessage) => {
    const chat = newMessage.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user.id === newMessage.sender._id) return;
      socket.in(user._id).emit("message received", newMessage);
    });
  });

  // socket.on("disconnect", (socket) => {
  //   console.log("User left.");
  // });
});

server.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});

// app.listen(port, function () {
//   console.log(`Express app running on port ${port}`);
// });
