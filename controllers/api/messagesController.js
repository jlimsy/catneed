const log = require("debug")("catneed:controllers:messagesController");
const Message = require("../../models/message");
const User = require("../../models/user");
const Chat = require("../../models/chat");

async function sendMessage(req, res) {
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
    message = await User.populate(message, { path: "chat.users" });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}

async function getAllMessages(req, res) {
  log("chatId %o", req.params.chatId);

  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}

module.exports = { sendMessage, getAllMessages };
