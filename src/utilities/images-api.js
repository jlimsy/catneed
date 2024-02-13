import debug from "debug";

const log = debug("catneed:utilities:images-api");

const BASE_URL = "/api/image/";

export async function postOne(imageData) {
  const response = await fetch(BASE_URL + "/upload", {
    method: "POST",
    body: imageData,
  });

  if (response.ok) {
    console.log("Image uploaded successfully");
  } else {
    console.error("Error uploading image");
  }
}
