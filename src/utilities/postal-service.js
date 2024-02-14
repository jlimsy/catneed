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
  const postal = await postalAPI.postalProfile(postalData);
  return postal;
}

export async function getAllPostal(postalData) {
  const allPostal = await postalAPI.getAllPostal(postalData);
  log("allPostal %o", allPostal);

  return allPostal.postal;
}

export async function sortByDist() {
  const sortPostal = await postalAPI.sortByDist();
  return sortPostal;
}
