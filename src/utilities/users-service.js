import debug from "debug";
import * as usersAPI from "./users-api";

const log = debug("catneed:utilities:users-service");
localStorage.debug = "catneed:*";

// ===== AUTHENTICATION ===== //
export async function signUp(userData) {
  log("userData", userData);

  const token = await usersAPI.signUp(userData);
  localStorage.setItem("token", token);
  log("token", token);
  return getUser();
}

export async function login(userData) {
  const token = await usersAPI.login(userData);
  localStorage.setItem("token", token);
  return getUser();
}

export function logOut() {
  localStorage.removeItem("token");
}

export function getToken() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  log("payload %o", payload);

  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }

  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

// ===== USER PROFILES ===== //
export async function userProfile(userData) {
  const user = await usersAPI.userProfile(userData);
  return user;
}

export async function updatePostal(postalData) {
  const postalCode = await usersAPI.updatePostal(postalData);
  log("postalCode %o", postalCode);
  return postalCode;
}

// ===== CHATS ===== //
export async function allChats() {
  const chats = await usersAPI.getChats();
  return chats;
}

// ===== ADMIN ===== //
//! Admin-access routes

export function getAdmin() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user.isAdmin : null;
}

export async function allUsers() {
  const users = await usersAPI.allUsers();
  console.log("allUsers", users);
  return users;
}
