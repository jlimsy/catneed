import { ISOToDateTime, ISOToDate } from "../../controllers/api/dateConverter";
import { delDonate } from "../utilities/donate-service";
import { accessChat } from "../utilities/chats-service";

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

  const handleChatClick = async () => {
    log("browseItem user._id %o", browseItem?.user._id);

    alert("Open chatModal with user.");

    const userId = { user: browseItem?.user._id };
    const chat = await accessChat(userId);
    log("chat %o", userId);
    log("chat %o", chat);
  };

  return (
    <div className="max-w-sm rounded-lg border min-h-80 border-sage-500 overflow-hidden shadow-lg bg-ice-100 bg-opacity-75 flex flex-col">
      <div className="grid grid-cols-3">
        <div className="text-left text-xs text-onyx-400 my-2 mx-2 col-span-2">
          Donated by{" "}
          <span className="font-bold italic">
            {user?.username} {browseItem?.user.username}{" "}
            {browseItem?.distance && (
              <span className="text-rust-400">
                {Math.trunc(browseItem?.distance)} km
              </span>
            )}
          </span>
        </div>
        <div className="text-right col-span-1">
          {user && (
            <span
              onClick={handleDelete}
              className="inline-block rounded-full bg-sage-200 hover:bg-sage-300 px-3 py-1 text-xs font-semibold my-2 mx-2"
            >
              Delete
            </span>
          )}
        </div>
      </div>
      {(donateItem?.image || browseItem?.image) && (
        <img
          className="w-full"
          src={donateItem?.image || browseItem?.image}
          alt="donated-item"
        />
      )}
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
          <button
            className="bg-drab-800 text-ice-100 text-xs py-1 px-2 rounded-full"
            onClick={() => handleChatClick(browseItem?.user._id)}
          >
            Chat
          </button>
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
