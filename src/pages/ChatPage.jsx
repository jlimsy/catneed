import { useEffect, useState } from "react";
import ChatTable from "../components/ChatPage/ChatTable";
import debug from "debug";

const log = debug("catneed:pages:chatpage");
localStorage.debug = "catneed:*";

const BASE_URL = "/api/image";

export default function ChatPage() {
  const [files, setFiles] = useState([]);

  const onImageChange = (event) => {
    const selectedFiles = event.target.files;
    setFiles(selectedFiles);
    // log("event.target.files %o", event.target.files);
    log("selectedFiles %o", selectedFiles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (files.length === 0) {
      return alert("please select an image");
    }

    const formData = new FormData();
    // log("formData %o", formData);

    for (const file of files) {
      formData.append("s3Images", file);
    }

    log("formData after append %o", formData);

    for (const entry of formData.entries()) {
      const [key, value] = entry;
      console.log(`${key}:`, value);
    }

    const result = await fetch(BASE_URL + "/upload", {
      method: "POST",
      body: formData,
    });
    log("result %o", result);

    const data = await result.json();
    log("data %o", data);
  };

  const fetchImages = async () => {};

  return (
    <section className="flex justify-center">
      <div>
        <ChatTable />
      </div>

      <div>
        <form onSubmit={handleSubmit} method="post">
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            name="image"
            multiple
          />
          <button type="submit">Upload</button>
          <button onClick={fetchImages}>Fetch</button>
        </form>
      </div>
    </section>
  );
}
