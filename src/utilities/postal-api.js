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

export async function getAllPostal() {
  const res = await sendRequest(BASE_URL + "/all", "GET");

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("postal-api: Invalid postalProfile");
  }
}

// export async function getDist() {
//   const res = await sendRequest(BASE_URL + "/dist", "GET");

//   if (res.ok) {
//     return res.json();
//   } else {
//     throw new Error("postal-api: Unable to retrieve distances");
//   }
// }

export async function sortByDist() {
  const res = await sendRequest(BASE_URL + "/sort", "GET");

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("postal-api: Unable to retrieve distances");
  }
}
