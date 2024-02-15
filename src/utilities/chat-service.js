import debug from "debug";
import * as chatAPI from "./chat-api";

const log = debug("catneed:utilities:chat-service");
localStorage.debug = "catneed:*";

export async function accessChat() {
  const chat = await chatAPI.getChat();
  return chat;
}
