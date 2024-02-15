import debug from "debug";
import sendRequest from "./send-request";

const log = debug("catneed:utilities:messages-api");
localStorage.debug = "catneed:*";

const BASE_URL = "/api/messages";

export async function getAllMessages(chatId) {
  const res = await sendRequest(BASE_URL + `/${chatId}`, "GET");
  // log("chatId %o", chatId);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("messages-api: Unable to get messages");
  }
}

export async function postMessage(chatData) {
  log("chatData %o", chatData);
  const res = await sendRequest(BASE_URL, "POST", chatData);
  log("chatData %o", chatData);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("messages-api: Unable to post message");
  }
}
