import sendRequest from "./send-request";

const BASE_URL = "/api/donate";

export async function postItem(donateData) {
  console.log("donate-api | before fetch ", donateData);
  const res = await sendRequest(BASE_URL, "POST", donateData);

  //   const res = await fetch(BASE_URL, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(donateData),
  //   });

  console.log("donate-api | after fetch", res);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("donate-api: Unable to post item");
  }
}
