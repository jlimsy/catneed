import debug from "debug";
import sendRequest from "./send-request";

const log = debug("catneed:utilities:chats-api");
localStorage.debug = "catneed:*";

const BASE_URL = "/api/chats";

export async function getChat(userId) {
  log("userId %o", userId);
  const res = await sendRequest(BASE_URL, "POST", userId);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("chats-api: Unable to get chat");
  }
}

//? ===== Get all user chats ===== //

export async function getChats() {
  const res = await sendRequest(BASE_URL, "GET");

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("chats-api: Unable to get chats");
  }
}
