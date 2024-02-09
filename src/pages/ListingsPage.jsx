import { useState, useEffect } from "react";
import DonateCard from "../components/DonateCard";
import { getDonate } from "../utilities/donate-service";
import { getRequest } from "../utilities/request-service";
import RequestCard from "../components/RequestCard";

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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {requestListings.map((requestItem) => (
          <RequestCard key={requestItem._id} requestItem={requestItem} />
        ))}
      </div>
      <h1>My Donations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {donateListings.map((donateItem) => (
          <DonateCard key={donateItem._id} donateItem={donateItem} />
        ))}
      </div>
    </>
  );
}
