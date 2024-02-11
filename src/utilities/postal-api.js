import sendRequest from "./send-request";
import debug from "debug";

const log = debug("catneed:utilities:postal-api");
localStorage.debug = "catneed:*";

const BASE_URL = "/api/postal";

export async function updatePostal(postalData) {
  log("postalData %o", postalData);

  const res = await sendRequest(BASE_URL, "POST", postalData);
  log("res %o", res);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("postal-api: Invalid Postal Code");
  }
}

export async function postalProfile() {
  const res = await sendRequest(BASE_URL, "GET");

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("postal-api: Invalid postalProfile");
  }
}
