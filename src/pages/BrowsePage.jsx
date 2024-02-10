import { useEffect, useState } from "react";
import DonateCard from "../components/DonateCard";
import { getAll } from "../utilities/donate-service";
import debug from "debug";
import { set } from "mongoose";
import PostalAlert from "../components/BrowsePage/PostalAlert";

const log = debug("catneed:pages:BrowsePage");
localStorage.debug = "catneed:*";

export default function BrowsePage({ user }) {
  const [browseItems, setBrowseItems] = useState([]);
  const [postalReminder, setPostalReminder] = useState(false);
  log("user %o", user);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const all = await getAll();
        setBrowseItems(all);
      } catch (error) {
        console.error("Error fetching items to browse:", error);
      }
    };

    const checkPostal = () => {
      if (user?.postal?.length === 0) {
        setPostalReminder(true);
        console.log("Please enter postal code");
      }
    };

    checkPostal();
    fetchAll(); // Call the function to fetch donate listings when the component mounts
  }, [user?.postal?.length]);

  return (
    <>
      {postalReminder && <PostalAlert />}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 w-4/5">
          {browseItems.map((browseItem) => (
            <DonateCard key={browseItem._id} browseItem={browseItem} />
          ))}
        </div>
      </div>
    </>
  );
}
