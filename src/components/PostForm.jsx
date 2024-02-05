import { useState } from "react";

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
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Large input
          </label>
          <input
            type="text"
            id="large-input"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Base input
          </label>
          <input
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Small input
          </label>
          <input
            type="text"
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </form>
    </section>
  );
}
