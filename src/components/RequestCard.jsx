import { ISOToDateTime } from "../../controllers/api/dateConverter";

export default function RequestCard({ requestItem }) {
  return (
    <div className="max-w-sm rounded-lg border border-rust-500 overflow-hidden shadow-lg bg-ice-100  bg-opacity-75  flex flex-col">
      <div className="text-right">
        <span className="inline-block rounded-full bg-rust-200 px-3 py-1 text-xs font-semibold my-2 mx-2">
          Delete
        </span>
      </div>
      <img
        className="w-full"
        src="/img/card-top.jpg"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4 flex-grow">
        <div className="font-bold text-xl mb-2">{requestItem?.name}</div>
        <p>{requestItem?.description}</p>
        <div>
          <p className="text-xs text-onyx-400 my-2">{requestItem?.category}</p>
        </div>
      </div>

      <div className="px-6 pt-4 pb-2 bg-rust-300 ">
        <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold  mr-2 mb-2">
          {requestItem?.location}
        </span>

        <span className="inline-block rounded-full px-3 py-1 text-sm mr-2 mb-2">
          <span className="text-xs">
            Posted on: <br />
          </span>
          <span className="font-semibold ">
            {ISOToDateTime(requestItem?.updatedAt)}
          </span>
        </span>
      </div>
    </div>
  );
}
