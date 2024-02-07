import * as donateAPI from "./donate-api";

export async function postDonate(donateData) {
  const donateItem = await donateAPI.postItem(donateData);
  JSON.stringify(donateItem);
  console.log("donate-service.js | postDonate", donateItem);
  return donateItem;
}
