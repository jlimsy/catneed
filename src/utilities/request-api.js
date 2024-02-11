import debug from "debug";
import sendRequest from "./send-request";

const log = debug("catneed:utilities:request-api");
localStorage.debug = "catneed:*";

const BASE_URL = "/api/request";

export async function postItem(requestData) {
  log("requestData %o", requestData);
  const res = await sendRequest(BASE_URL, "POST", requestData);

  log("res %o", res);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("requesr-api: Unable to post item");
  }
}

export async function getListings() {
  const res = await sendRequest(BASE_URL + "/listings", "GET");
  log("res %o", res);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("request-api: Unable to get listings");
  }
}

export async function delItem(itemId) {
  log("itemId %o", itemId);
  const res = await sendRequest(BASE_URL + `/${itemId}`, "DELETE");
  log("res %o", res);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("request-api: Unable to delete listing");
  }
}

export async function getAll() {
  const res = await sendRequest(BASE_URL, "GET");

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("request-api: Unable to get all");
  }
}
