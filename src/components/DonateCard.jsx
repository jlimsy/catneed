import { ISOToDateTime, ISOToDate } from "../../controllers/api/dateConverter";
import { delDonate } from "../utilities/donate-service";

import debug from "debug";

const log = debug("catneed:components:DonateCard");

export default function DonateCard({
  user,
  donateItem,
  browseItem,
  donateListings,
  setDonateListings,
}) {
  const handleDelete = async () => {
    try {
      await delDonate(donateItem._id);
      setDonateListings(
        donateListings.filter((item) => item._id !== donateItem._id)
      );
    } catch (error) {
      log("error %o", error);
    }
  };

  return (
    <div className="max-w-sm rounded-lg border h-80 border-sage-500 overflow-hidden shadow-lg bg-ice-100 bg-opacity-75 flex flex-col">
      <div className="grid grid-cols-2">
        <div className="text-left text-xs text-onyx-400 my-2 mx-2">
          Donated by{" "}
          <span className="font-bold italic">
            {user?.username} {browseItem.user.username}
          </span>
        </div>
        <div className="text-right">
          <span
            onClick={handleDelete}
            className="inline-block rounded-full bg-sage-200 hover:bg-sage-300 px-3 py-1 text-xs font-semibold my-2 mx-2"
          >
            Delete
          </span>
        </div>
      </div>
      <img
        className="w-full"
        src="/img/card-top.jpg"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4 flex-grow">
        <div className="font-bold text-xl mb-2">
          {donateItem?.name}
          {browseItem?.name}
        </div>
        <p>
          {donateItem?.description} {browseItem?.description}
        </p>
        <div>
          <p className="text-xs text-onyx-400 my-2">
            {donateItem?.category} {browseItem?.category}
          </p>
        </div>
      </div>
      <div className="content-end  bg-sage-200 grid grid-cols-2 grid-rows-2 py-4">
        <div className="col-span-1">
          <span className="inline-block bg-sage-300 rounded-full px-3 py-1 text-sm font-semibold ">
            {donateItem?.status}
            {browseItem?.status}
          </span>
        </div>

        <div className="col-span-1">
          <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold ">
            {donateItem?.location}
            {browseItem?.location}
          </span>
        </div>

        <div className="col-span-1 ">
          <span className="inline-block px-3 py-1 text-sm">
            <span className="text-xs">
              Expires on: <br />
            </span>
            <span className="font-semibold">
              {browseItem?.expiry || donateItem?.expiry
                ? ISOToDate(browseItem?.expiry || donateItem?.expiry)
                : "NA"}
            </span>
          </span>
        </div>

        <div className="col-span-1 ">
          <span className="inline-block px-3 py-1 text-sm">
            <span className="text-xs">
              Posted on: <br />
            </span>
            <span className="font-semibold">
              {browseItem
                ? ISOToDateTime(browseItem?.updatedAt)
                : ISOToDateTime(donateItem?.createdAt)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
