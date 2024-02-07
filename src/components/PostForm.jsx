import { useState } from "react";
import categories from "../assets/categories";

const BASE_URL = "/api/image/upload";

export default function PostForm() {
  const [images, setImages] = useState([]);

  const onImageChange = (event) => {
    const selectedImages = event.target.files;
    setImages(selectedImages);
    console.log(selectedImages);
  };

  const handleClick = () => {
    console.log("add more images?");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (images.length === 0) {
  //     alert("Please select an image.");
  //     return;
  //   }

  //   if (images.length > 5) {
  //     alert("Maximum 5 images at a time.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   for (const image of images) {
  //     formData.append("s3images", image);
  //   }

  //   const result = await fetch(BASE_URL, {
  //     method: "POST",
  //     body: formData,
  //   });

  //   const data = await result.json();
  //   console.log(data);
  // };

  return (
    <section>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="block border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="photo">Upload photo of your item:</label>

          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={onImageChange}
          />
          <button onClick={handleClick}>Add</button>
        </div>

        <div className="mb-5">
          <label
            htmlFor="category"
            className="block mb-2 font-medium text-gray-900"
          >
            Category:
          </label>
          <select
            id="countries"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            {Object.keys(categories).map((category) => (
              <option key={category}> {categories[category]} </option>
            ))}
          </select>
        </div>
      </form>
    </section>
  );
}
