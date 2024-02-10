import debug from "debug";
import * as requestAPI from "./request-api";

const log = debug("catneed:utilities:request-service");
localStorage.debug = "catneed:*";

export async function postRequest(requestData) {
  // log("requestData %o", requestData);

  const requestItem = await requestAPI.postItem(requestData);
  return requestItem;
}

export async function getRequest() {
  const requestListings = await requestAPI.getListings();
  // log("requestListings %o", requestListings);

  JSON.stringify(requestListings);
  return requestListings;
}

export async function delRequest(itemId) {
  log("itemId %o", itemId);
  const requestItem = await requestAPI.delItem(itemId);
  log("requestItem %o", requestItem);

  return requestItem;
}

export async function getAllRequests() {
  const allRequestListings = await requestAPI.getAll();
  return allRequestListings;
}
