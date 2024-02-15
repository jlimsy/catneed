import debug from "debug";
import sendRequest from "./send-request";

const log = debug("catneed:utilities:chat-api");
localStorage.debug = "catneed:*";

const BASE_URL = "/api/chats";

export async function getChat() {
  const res = await sendRequest(BASE_URL, "POST");

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("donate-api: Unable to get listings");
  }
}
