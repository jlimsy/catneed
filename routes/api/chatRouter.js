const express = require("express");
const router = express.Router();
const chatCtrl = require("../../controllers/api/chatController");
const { checkToken } = require("../../config/checkToken");

//? Accessing or creating the chat
router.post("/", checkToken, chatCtrl.accessChat);

//? Get chats for logged in user
router.get("/", checkToken, chatCtrl.getChats);

module.exports = router;
