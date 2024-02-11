import debug from "debug";
import * as postalAPI from "./postal-api";

const log = debug("catneed:utilities:postal-service");
localStorage.debug = "catneed:*";

//! ==== TEST ==== //

export async function updatePostal(postalData) {
  log("postalCode %o", postalData);

  const postalCode = await postalAPI.updatePostal(postalData);
  log("postalCode %o", postalCode);
  return postalCode;
}

export async function postalProfile(postalData) {
  const user = await postalAPI.postalProfile(postalData);
  JSON.stringify(user);
  return user;
}

//! ==== TEST ==== //
