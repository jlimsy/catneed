import debug from "debug";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { postRequest } from "../utilities/request-service";
import categories from "../assets/categories";
import planningAreas from "../assets/planningAreas";

const log = debug("catneed:components:PostRequestForm");
localStorage.debug = "catneed:*";

const BUCKET_NAME = "catneed";
const REGION = "ap-southeast-1";

export default function PostRequestForm({ user }) {
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;
  const [file, setFile] = useState([]);

  const onSubmit = async (data) => {
    try {
      const requestItem = await postRequest(data);

      console.log(data);
    } catch (error) {
      console.log("PostRequestForm.jsx:", error);
    }
  };

  useEffect(() => {
    setValue(
      "image",
      "https://img.freepik.com/free-psd/beautiful-cat-portrait-isolated_23-2150186043.jpg"
    );
  }, [setValue]);

  const onImageChange = (event) => {
    const selectedFile = event.target.files[0];
    const originalFileName = selectedFile.name;
    const sanitizedFileName = sanitizeFileName(originalFileName);

    // Create a new File object with the sanitized file name
    const sanitizedFile = new File([selectedFile], sanitizedFileName, {
      type: selectedFile.type,
    });

    setFile(sanitizedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      return alert("Please select an image");
    }

    const fileData = new FormData();
    fileData.append("file", file);

    const image = await uploadOne(fileData);
    log("name of selected file %o", file.name);
    const fileUrl = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${file.name}`;
    log("fileUrl %o", fileUrl);
    setValue("image", fileUrl);
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2">
          Name
        </label>

        <input
          type="text"
          id="name"
          className="block border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-rust-500 focus:border-rust-500"
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

        <div className="flex flex-row">
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={onImageChange}
          />
          <button
            type="button"
            className="bg-sage-600 text-ice-100 hover:bg-rust-400 focus:ring-rust-500 ml-5"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
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
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rust-500 focus:border-rust-500 block w-full p-2.5"
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
      <button
        type="submit"
        className="bg-drab-800 text-ice-100 hover:bg-rust-400 focus:ring-rust-500"
      >
        Request
      </button>
    </form>
  );
}
