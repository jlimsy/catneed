import debug from "debug";
import sendRequest from "./send-request";

const log = debug("catneed:utilities:messages-api");
localStorage.debug = "catneed:*";

const BASE_URL = "/api/messages";

export async function getAllMessages(chatId) {
  const res = await sendRequest(BASE_URL + `/65cdb5075a83696ad2de2786`, "GET");

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("messages-api: Unable to get messages");
  }
}
