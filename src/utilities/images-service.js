import debug from "debug";
import * as imagesAPI from "./images-api";

const log = debug("catneed:utilities:images-service");

export async function uploadOne(imageData) {
  const image = await imagesAPI.postOne(imageData);
  return image;
}
