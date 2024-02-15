const log = require("debug")("catneed:controllers:chatController");
const Message = require("../../models/message");
const User = require("../../models/user");
const Chat = require("../../models/chat");

async function accessChat(req, res) {
  const sender = req.user._id;
  const recipient = "65c9da18c9d307281c297bfe"; // quack
  log("sender %o", sender);
  log("recipient %o", req.body.user);

  let chatExists = await Chat.findOne({ users: { $all: [sender, recipient] } })
    .populate("users", "-password")
    .populate("latestMessage");

  if (chatExists) {
    chatExists = await User.populate(chatExists, {
      path: "latestMessage.sender",
    });
    res.send(chatExists);
  } else {
    const chatData = {
      chatName: "test",
      users: [sender, recipient],
    };

    log("chatData %o", chatData);

    try {
      const createdChat = await Chat.create(chatData);
      log("chatData %o", chatData);
      log("createdChat %o", createdChat);

      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.send(fullChat);
    } catch (error) {
      res.status(500).json("Unable to create chat");
    }
  }
}

async function getChats(req, res) {
  try {
    let allChats = Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    allChats = await User.populate(allChats, { path: "latestMessage.sender" });

    res.send(allChats);
  } catch (error) {
    res.status(500).json("Unable to retrieve or create chat");
  }
}

module.exports = { accessChat, getChats };
