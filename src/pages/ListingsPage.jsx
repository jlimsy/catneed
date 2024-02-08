import { useState } from "react";
import ItemCard from "../components/ItemCard";
import { getDonate } from "../utilities/donate-service";

export default function ListingsPage() {
  const [donateListings, setDonateListings] = useState(getDonate());

  return (
    <>
      <h1>My Requests</h1>
      <ItemCard />
      <h1>My Donations</h1>
    </>
  );
}
