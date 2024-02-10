require("dotenv").config();
require("./config/database");

// Require the Mongoose models
const User = require("./models/user");
const Request = require("./models/request");
const Donate = require("./models/donate");
