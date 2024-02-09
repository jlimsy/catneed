import { ISOToDateTime, ISOToDate } from "../../controllers/api/dateConverter";

export default function DonateCard({ donateItem, browseItem }) {
  return (
    <div className="max-w-sm rounded-lg border border-sage-500 overflow-hidden shadow-lg bg-ice-100 bg-opacity-75 flex flex-col">
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
      <div className="content-end px-6 pt-4 pb-2 bg-sage-200 grid grid-cols-2 grid-rows-2 ">
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
