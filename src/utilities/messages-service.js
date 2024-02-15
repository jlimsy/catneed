import debug from "debug";
import * as messagesAPI from "./messages-api";

const log = debug("catneed:utilities:messages-service");
localStorage.debug = "catneed:*";

export async function getAllMessages(chatId) {
  // log("chatId %o", chatId);
  const messages = await messagesAPI.getAllMessages(chatId);
  // log("messages %o", messages);
  return messages;
}

export async function postMessage(chatData) {
  log("chatData %o", chatData);
  const message = await messagesAPI.postMessage(chatData);
  log("message %o", message);
  return message;
}
