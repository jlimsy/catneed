const log = require("debug")("catneed:config/distance");
require("dotenv").config();

const BASE_URL = "https://www.onemap.gov.sg/api";
let oneMapToken = "";

const getToken = async () => {
  try {
    const res = await fetch(BASE_URL + "/auth/post/getToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: process.env.ONE_MAP_EMAIL,
        password: process.env.ONE_MAP_PW,
      }),
    });

    const tokenData = await res.json();
    return tokenData["access_token"];
  } catch (error) {
    console.error("Error retrieving token:", error);
    throw error; // Rethrow the error to handle it outside
  }
};

const retrieveToken = async () => {
  try {
    const token = await getToken();
    oneMapToken = token;
    console.log("OneMapToken:", oneMapToken);
    return oneMapToken;
    // Do something with the token if needed
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

log("oneMapToken %o", oneMapToken);

// https://www.onemap.gov.sg/api/common/elastic/search?searchVal=320086&returnGeom=Y&getAddrDetails=Y
// const postalCode = "320086";
// const postalCode2 = "320098";

const getLatLong = async (postalCode) => {
  const res = await fetch(
    BASE_URL +
      `/common/elastic/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  const details = await res.json();

  if (details.results.length === 0) {
    res.status(404).json({ msg: "Please input a valid postal code." });
  }

  const { LATITUDE, LONGITUDE } = details.results[0];
  // console.log(LATITUDE, LONGITUDE);
  return { LATITUDE, LONGITUDE };
};

module.exports = { getLatLong };

// const main = async () => {
//   // retrieveToken();
//   await getLatLong();
// };

// main();
