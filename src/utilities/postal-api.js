import sendRequest from "./send-request";
import debug from "debug";

const log = debug("catneed:utilities:postal-api");
localStorage.debug = "catneed:*";

const BASE_URL = "/api/postal";

export async function updatePostal(postalData) {
  const res = await sendRequest(BASE_URL, "POST", postalData);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("postal-api: Invalid Postal Code");
  }
}
