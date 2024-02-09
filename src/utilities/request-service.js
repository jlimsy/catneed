import debug from "debug";
import * as requestAPI from "./request-api";

const log = debug("catneed:utilities:request-service");
localStorage.debug = "catneed:*";

export async function postRequest(requestData) {
  log("requestData %o", requestData);

  const requestItem = await requestAPI.postItem(requestData);
  return requestItem;
}

export async function getRequest() {
  const requestListings = await requestAPI.getListings();
  log("requestListings %o", requestListings);

  JSON.stringify(requestListings);
  return requestListings;
}
