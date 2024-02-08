import debug from "debug";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { postDonate } from "../utilities/donate-service";
import categories from "../assets/categories";
import conditions from "../assets/conditions";
import planningAreas from "../assets/planningAreas";

const log = debug("catneed:components:PostForm");
localStorage.debug = "catneed:*";

const BASE_URL = "/api/image/upload";

export default function PostForm({ user }) {
  // console.log("PostForm | user", user);

  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;
  const [images, setImages] = useState([]);

  // const onImageChange = (event) => {
  //   const selectedImages = event.target.files;
  //   setImages(selectedImages);
  //   console.log(selectedImages);
  // };

  const handleClick = () => {
    console.log("add more images?");
  };

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      user: user._id,
    };

    try {
      const donateItem = await postDonate(formData);
      log("donateItem %o", donateItem);

      console.log(formData);
    } catch (error) {
      console.log("PostForm.jsx:", error);
    }
  };

  useEffect(() => {
    setValue("status", "Available"); // Set the default value of status to "Available"
  }, [setValue]);

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
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2">
          Name
        </label>

        <input
          type="text"
          id="name"
          className="block border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
          {...register("name", {
            required: {
              value: true,
              message: "Please input name of item.",
            },
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div className="mb-5">
        <label htmlFor="photo">Upload photo of your item:</label>

        <input type="string" id="image" name="image" {...register("image")} />

        {/* <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={onImageChange}
          {...register("image")}
        /> */}

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
          id="category"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          {...register("category")}
          defaultValue="Select category"
        >
          {Object.keys(categories).map((category) => (
            <option key={category} value={categories[category]}>
              {categories[category]}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label
          htmlFor="description"
          className="block mb-2 font-medium text-gray-900"
        >
          Description:
        </label>

        <textarea
          className="h-full min-h-[100px] w-full resize-none rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0"
          {...register("description", {
            required: {
              value: true,
              message: "Please provide a description of your item.",
            },
          })}
        />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div className="mb-5">
        <label
          htmlFor="expiry"
          className="block mb-2 font-medium text-gray-900"
        >
          Expiry:
        </label>

        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            type="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("expiry")}
          />
        </div>
      </div>

      <div className="flex mb-5">
        <input
          {...register("condition", {
            required: "Please indicate condition of your item.",
          })}
          type="radio"
          value="New"
        />
        <label htmlFor="New">New</label>
        <input
          {...register("condition", {
            required: "Please indicate condition of your item.",
          })}
          type="radio"
          value=" Used"
        />
        <label htmlFor="Used" className="block mb-2 font-medium text-gray-900">
          Used
        </label>
        <div> {errors.condition && <p>{errors.condition.message}</p>}</div>
      </div>

      <div className="mb-5">
        <label
          htmlFor="condition"
          className="block mb-2 font-medium text-gray-900"
        >
          Location:
        </label>

        <select
          id="location"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          defaultValue="Select location"
          {...register("location", {
            required: {
              value: true,
              message: "Please select a pick-up location.",
            },
          })}
        >
          {planningAreas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Post</button>
    </form>
  );
}
