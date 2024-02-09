import { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import { getDonate } from "../utilities/donate-service";
import { getRequest } from "../utilities/request-service";

export default function ListingsPage() {
  const [donateListings, setDonateListings] = useState([]);
  const [requestListings, setRequestListings] = useState([]);

  useEffect(() => {
    const fetchDonateListings = async () => {
      try {
        const listings = await getDonate();
        setDonateListings(listings);
      } catch (error) {
        console.error("Error fetching donate listings:", error);
      }
    };

    const fetchRequestListings = async () => {
      try {
        const listings = await getRequest();
        setRequestListings(listings);
      } catch (error) {
        console.error("Error fetching Request listings:", error);
      }
    };

    fetchRequestListings(); // Call the function to fetch donate listings when the component mounts
    fetchDonateListings(); // Call the function to fetch donate listings when the component mounts
  }, []);

  return (
    <>
      <h1>My Requests</h1>
      <ItemCard />
      <h1>My Donations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {donateListings.map((donateItem) => (
          <ItemCard key={donateItem._id} donateItem={donateItem} />
        ))}
      </div>
    </>
  );
}
