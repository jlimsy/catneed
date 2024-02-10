import { getToken } from "./users-service";
import sendRequest from "./send-request";
import debug from "debug";
import { setDriver } from "mongoose";

const log = debug("catneed:utilities:users-api");
localStorage.debug = "catneed:*";

const BASE_URL = "/api/users";

export async function signUp(userData) {
  log("userData %o", userData);

  // const res = sendRequest(BASE_URL, "POST", userData);
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  log("res %o", res);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("users-api: Invalid Sign Up");
  }
}

export async function login(userData) {
  const res = await fetch(BASE_URL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  console.log("users-api | res.body", res, res.body);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("users-api: Invalid Login");
  }
}

//! Protected routes
export async function userProfile(userData) {
  const res = await sendRequest(BASE_URL + "/profile", "GET", userData);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("users-api: Invalid Profile");
  }
}

// export async function updatePostal(postalData) {
//   const res = await sendRequest(BASE_URL + "/profile", "PATCH", postalData);

//   if (res.ok) {
//     return res.json();
//   } else {
//     throw new Error("users-api: Invalid Postal Code");
//   }
// }

//! Admin-access routes

export async function allUsers() {
  const res = await sendRequest(BASE_URL + "/all", "GET");

  // const res = await fetch(BASE_URL + "/all", {
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(),
  // });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("users-api: Invalid fetchAllUsers");
  }
}
