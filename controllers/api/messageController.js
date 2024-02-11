const log = require("debug")("catneed:controllers:messageController");
const Message = require("../../models/message");
const User = require("../../models/user");
const Chat = require("../../models/chat");

/*
async function create(req, res) {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(400).json({ msg: "No chat found." });
  }

  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);
    message = await message.populate("sender");
    message = await message.populate("chat");
    message = await User.populate(message, { path: "chat.user" });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}

async function getAll(req, res) {
  try {
    const messages = await Message.find({ chatId: req.params.chatId })
      .populate("sender")
      .populate("chat");
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}

module.exports = { create, getAll };
*/
