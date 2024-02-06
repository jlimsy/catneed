import { getToken } from "./users-service";

const BASE_URL = "/api/users";

export async function signUp(userData) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Sign Up");
  }
}

export async function login(userData) {
  const res = await fetch(BASE_URL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("users-api: Invalid Login");
  }
}

export async function userProfile(userData) {
  const token = getToken();
  const res = await fetch(BASE_URL + "/profile", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(userData),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("users-api: Invalid Profile");
  }
}

export async function allUsers() {
  const res = await fetch(BASE_URL + "/all", {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("users-api: Invalid fetchAllUsers");
  }
}

export async function updatePostal(postalData) {
  const res = await fetch(BASE_URL, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postalData }),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("users-api: Invalid Postal Code");
  }
}
