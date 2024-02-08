import debug from "debug";
import sendRequest from "./send-request";

const log = debug("catneed:utilities:donate-api");
localStorage.debug = "catneed:*";

const BASE_URL = "/api/donate";

export async function postItem(donateData) {
  log("donateData %o", donateData);
  const res = await sendRequest(BASE_URL, "POST", donateData);

  //   const res = await fetch(BASE_URL, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(donateData),
  //   });

  log("res %o", res);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("donate-api: Unable to post item");
  }
}

export async function getAll() {
  const res = await sendRequest(BASE_URL, "GET");

  log("res %o", res);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("donate-api: Unable to get listings");
  }
}
