import * as donateAPI from "./donate-api";

export async function postDonate(donateData) {
  console.log("donate-service.js | donateData", donateData);

  const donateItem = await donateAPI.postItem(donateData);
  // this part not working because anything below does not appear

  JSON.stringify(donateItem);
  console.log("donate-service.js | postDonate", donateItem);
  return donateItem;
}
