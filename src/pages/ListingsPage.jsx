import { useState, useEffect } from "react";
import DonateCard from "../components/DonateCard";
import { getDonate } from "../utilities/donate-service";
import { getRequest } from "../utilities/request-service";
import RequestCard from "../components/RequestCard";

export default function ListingsPage({ user }) {
  const [donateListings, setDonateListings] = useState([]);
  const [requestListings, setRequestListings] = useState([]);
  const [listingsExist, setListingsExist] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const donateListings = await getDonate();
        const requestListings = await getRequest();
        setDonateListings(donateListings);
        setRequestListings(requestListings);
        setListingsExist(
          requestListings.length > 0 || donateListings.length > 0
        );
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings(); // Call the function to fetch listings when the component mounts
  }, [requestListings.length, donateListings.length]);

  return (
    <section>
      <div className="flex justify-center bg-gradient-to-r from-sage-200 to-rust-200">
        <div className="flex flex-col">
          <div>
            <h1 className="font-bold mt-10">My Donations</h1>
          </div>

          <div className="mx-5 my-10 p-10 bg-ice-100 rounded-lg bg-opacity-50">
            <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {listingsExist ? (
                donateListings.map((donateItem) => (
                  <DonateCard
                    key={donateItem._id}
                    user={user}
                    donateItem={donateItem}
                    donateListings={donateListings}
                    setDonateListings={setDonateListings}
                  />
                ))
              ) : (
                <div className="col-span-4">
                  <p>You have not posted any donations.</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <h1 className="font-bold ">My Requests</h1>
          </div>

          <div className="mx-5 my-10 p-10 bg-ice-100 rounded-lg bg-opacity-50">
            <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {listingsExist ? (
                requestListings.map((requestItem) => (
                  <RequestCard
                    key={requestItem._id}
                    user={user}
                    requestItem={requestItem}
                    requestListings={requestListings}
                    setRequestListings={setRequestListings}
                  />
                ))
              ) : (
                <div className="col-span-4">
                  <p>You have not posted any requests.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
