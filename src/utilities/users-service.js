import * as usersAPI from "./users-api";

export async function signUp(userData) {
  const token = await usersAPI.signUp(userData);
  localStorage.setItem("token", token);
  return getUser();
}

export async function login(userData) {
  const token = await usersAPI.login(userData);
  localStorage.setItem("token", token);
  return getUser();
}

export async function userProfile(userData) {
  const user = await usersAPI.userProfile(userData);
  JSON.stringify(user);

  console.log("userProfile", user);

  return user;
}

export async function allUsers() {
  const user = await usersAPI.allUsers();
  console.log("allUsers", user);
  return user;
}

export async function updatePostal(postalData) {
  const postalCode = await usersAPI.updatePostal(postalData);
  console.log("users-service | postal code:", postalCode);

  return postalCode;
}

export function getToken() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  console.log("payload", payload);

  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }

  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;

  // if (!token) {
  //   return { username: null, isAdmin: null };
  // }
  // const decodedToken = JSON.parse(atob(token.split(".")[1]));
  // return { username: decodedToken.username, isAdmin: decodedToken.isAdmin };
}

// export function checkIsAdmin() {
//   const token = getToken();

//   return token ? JSON.parse(atob(token.split(".")[1])).isAdmin : null;
// }

export function logOut() {
  localStorage.removeItem("token");
}
