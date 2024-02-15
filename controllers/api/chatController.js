const log = require("debug")("catneed:controllers:chatController");
const Message = require("../../models/message");
const User = require("../../models/user");
const Chat = require("../../models/chat");
const { all } = require("../../routes/api/chatRouter");

async function accessChat(req, res) {
  const sender = req.user._id;
  const recipient = req.body.user;

  let isChat = await Chat.find({ user: sender })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, { path: "latestMessage.sender" });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    const chatData = {
      chatName: "sender",
      users: [sender, recipient],
    };

    try {
      const createdChat = await Chat.create(chatData);

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
