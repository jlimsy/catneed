import debug from "debug";
import sendRequest from "./send-request";

const log = debug("catneed:utilities:donate-api");
localStorage.debug = "catneed:*";

const BASE_URL = "/api/donate";

export async function getAll() {
  const res = await sendRequest(BASE_URL, "GET");

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("donate-api: Unable to get listings");
  }
}

export async function getAllWithDist() {
  const res = await sendRequest(BASE_URL + "/browse", "GET");

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("donate-api: Unable to get listings");
  }
}

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

export async function getListings() {
  const res = await sendRequest(BASE_URL + "/listings", "GET");

  log("res %o", res);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("donate-api: Unable to get listings");
  }
}

export async function delItem(itemId) {
  log("itemId %o", itemId);
  const res = await sendRequest(BASE_URL + `/${itemId}`, "DELETE");
  log("res %o", res);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("donate-api: Unable to delete listing");
  }
}

export async function getItemsByName(itemName) {
  const res = await sendRequest(BASE_URL + `/name?name=${itemName}`, "GET");
  log("res %o", res);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("donate-api: Unable to etrieve listings by name");
  }
}

export async function getItemsByCat(category) {
  const res = await sendRequest(
    BASE_URL + `/category?category=${category}`,
    "GET"
  );
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("donate-api: Unable to retrieve listings by category");
  }
}
