const express = require("express");
const router = express.Router();
const messageCtrl = require("../../controllers/api/messageController");
const { checkToken } = require("../../config/checkToken");

// router.post("/", checkToken, messageCtrl.create);
// router.get("/:chatId", checkToken, messageCtrl.getAll);

module.exports = router;
