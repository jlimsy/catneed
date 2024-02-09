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
    <section>
      <div className="flex justify-center bg-gradient-to-r from-sage-200 to-rust-200">
        <div className="flex flex-col">
          <div>
            <h1 className="font-bold mt-10">My Requests</h1>
          </div>

          <div className="mx-5 my-10 p-10 bg-ice-100 rounded-lg bg-opacity-50">
            <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {requestListings.map((requestItem) => (
                <RequestCard key={requestItem._id} requestItem={requestItem} />
              ))}
            </div>
          </div>

          <div>
            <h1 className="font-bold">My Donations</h1>
          </div>

          <div className="mx-5 my-10 p-10 bg-ice-100 rounded-lg bg-opacity-50">
            <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {donateListings.map((donateItem) => (
                <DonateCard key={donateItem._id} donateItem={donateItem} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
