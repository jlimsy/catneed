import debug from "debug";
import * as messagesAPI from "./messages-api";

const log = debug("catneed:utilities:messages-service");
localStorage.debug = "catneed:*";

export async function getAllMessages(chatId) {
  log("chatId %o", chatId);
  const messages = await messagesAPI.getAllMessages(chatId);
  log("messages %o", messages);
  return messages;
}
