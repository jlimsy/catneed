import debug from "debug";
import * as chatsAPI from "./chats-api";

const log = debug("catneed:utilities:chats-service");
localStorage.debug = "catneed:*";

export async function accessChat(userId) {
  log("userId %o", userId);
  const chat = await chatsAPI.getChat(userId);
  return chat;
}

//? ===== Get all user chats ===== //
export async function allChats() {
  const chats = await chatsAPI.getChats();
  return chats;
}
