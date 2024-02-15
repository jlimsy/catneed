const express = require("express");
const router = express.Router();
const messageCtrl = require("../../controllers/api/messageController");
const { checkToken } = require("../../config/checkToken");

//* post a new message
router.post("/", checkToken, messageCtrl.sendMessage);

//* fetch all the messages in a single chat
// router.get("/:chatId", checkToken, messageCtrl.getAll);

//* ===== TEST ===== //
/*
router.get("/", (req, res) => {
    res.json("hello");
  });
  */

module.exports = router;
