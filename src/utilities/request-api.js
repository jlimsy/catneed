import debug from "debug";
import sendRequest from "./send-request";

const log = debug("catneed:utilities:request-api");
localStorage.debug = "catneed:*";

const BASE_URL = "/api/request";

export async function getAll() {
  const res = await sendRequest(BASE_URL, "GET");
  log("res %o", res);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("request-api: Unable to get listings");
  }
}
