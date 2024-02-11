// ===== REQUIRE BLOCK ===== //
const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("catneed:server");

//* Database
require("dotenv").config();
require("./config/database");

const app = express();

//* Chat
/*
const { Server } = require("socket.io");
const io = new Server(app);
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
*/

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
// app.use("/api/chat", require("./routes/api/chatRouter"));
// app.use("/api/message", require("./routes/api/messageRouter"));

app.use("/api/test", require("./routes/api/testRouter"));

app.use("/api/image", require("./routes/api/imagesRouter"));

//! Catch all route
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ===== LISTEN BLOCK ===== //
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
