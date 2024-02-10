import { useEffect, useState } from "react";
import DonateCard from "../components/DonateCard";
import RequestCard from "../components/RequestCard";
import { getAll } from "../utilities/donate-service";
import { getAllRequests } from "../utilities/request-service";
import debug from "debug";
import PostalAlert from "../components/BrowsePage/PostalAlert";

const log = debug("catneed:pages:BrowsePage");
localStorage.debug = "catneed:*";

export default function BrowsePage({ user }) {
  const [browseItems, setBrowseItems] = useState([]);
  const [requestItems, setRequestItems] = useState([]);
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
      if (!user?.postal || user?.postal?.length === 0) {
        setPostalReminder(true);
        console.log("Please enter postal code");
      }
    };

    checkPostal();
    fetchAll(); // Call the function to fetch donate listings when the component mounts
  }, [user?.postal, user?.postal?.length]);

  const handleDonate = async () => {
    const all = await getAll();
    setRequestItems(false);
    setBrowseItems(all);
  };

  const handleRequest = async () => {
    const all = await getAllRequests();
    setBrowseItems(false);
    setRequestItems(all);
  };

  return (
    <section>
      {postalReminder && <PostalAlert />}
      <div className="flex flex-col">
        <div>
          <h1 className="font-bold mt-5 mb-8">
            Browse all{" "}
            <button
              onClick={handleDonate}
              className="bg-sage-300 text-drab-800 hover:bg-sage-400 focus:ring-sage-500 mx-2"
            >
              Donations
            </button>
            <button
              onClick={handleRequest}
              className="bg-rust-400 text-ice-100 hover:bg-rust-300 focus:ring-rust-500"
            >
              Requests
            </button>
          </h1>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 w-4/5">
            {browseItems
              ? browseItems.map((browseItem) => (
                  <DonateCard key={browseItem._id} browseItem={browseItem} />
                ))
              : requestItems.map((requestItem) => (
                  <RequestCard
                    key={requestItem._id}
                    requestItem={requestItem}
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
