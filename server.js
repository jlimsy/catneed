// ===== REQUIRE BLOCK ===== //
const express = require("express");
const path = require("path");
const logger = require("morgan");
//* Database
require("dotenv").config();
require("./config/database");

const app = express();

// ===== MIDDLEWARE ===== //
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
// app.use(require("./config/checkToken"));

// ===== ROUTES ===== //
app.use("/api/users", require("./routes/api/usersRouter"));

//! Protected routes
// app.use("/api/image", require("./routes/api/imagesRouter"));

//! Catch all route
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ===== LISTEN BLOCK ===== //
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
