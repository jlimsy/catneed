import debug from "debug";
import * as requestAPI from "./request-api";

const log = debug("catneed:utilities:request-service");
localStorage.debug = "catneed:*";

export async function getRequest() {
  const requestListings = await requestAPI.getListings();
  log("requestListings %o", requestListings);

  JSON.stringify(requestListings);
  return requestListings;
}
