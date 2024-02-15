import debug from "debug";
import * as chatsAPI from "./chats-api";

const log = debug("catneed:utilities:chat-service");
localStorage.debug = "catneed:*";

export async function accessChat() {
  const chat = await chatsAPI.getChat();
  return chat;
}

//? ===== Get all user chats ===== //
export async function allChats() {
  const chats = await chatsAPI.getChats();
  return chats;
}
