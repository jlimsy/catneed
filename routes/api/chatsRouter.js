const express = require("express");
const router = express.Router();
const chatCtrl = require("../../controllers/api/chatsController");
const { checkToken } = require("../../config/checkToken");

//? ACCESSING chat or CREATING chat (if !chatExists)
router.post("/", checkToken, chatCtrl.accessChat);

//? Get chats for logged in user
router.get("/", checkToken, chatCtrl.getChats);

module.exports = router;
