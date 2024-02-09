import { useEffect, useState } from "react";
import DonateCard from "../components/DonateCard";
import { getAll } from "../utilities/donate-service";

export default function BrowsePage() {
  const [browseItems, setBrowseItems] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const all = await getAll();
        setBrowseItems(all);
      } catch (error) {
        console.error("Error fetching items to browse:", error);
      }
    };

    fetchAll(); // Call the function to fetch donate listings when the component mounts
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {browseItems.map((browseItem) => (
        <DonateCard key={browseItem._id} browseItem={browseItem} />
      ))}
      ;
    </div>
  );
}
