import debug from "debug";
import * as donateAPI from "./donate-api";

const log = debug("catneed:utilities:donate-service");
localStorage.debug = "catneed:*";

export async function getAll() {
  const allDonateListings = await donateAPI.getAll();
  log("allDonateListings %o", allDonateListings);

  //   JSON.stringify(allDonateListings);
  return allDonateListings;
}

export async function postDonate(donateData) {
  log("donateData %o", donateData);

  const donateItem = await donateAPI.postItem(donateData);

  JSON.stringify(donateItem);
  log("donateItem %o", donateItem);
  return donateItem;
}

export async function getDonate() {
  const donateListings = await donateAPI.getListings();
  log("donateListings %o", donateListings);

  JSON.stringify(donateListings);
  return donateListings;
}
