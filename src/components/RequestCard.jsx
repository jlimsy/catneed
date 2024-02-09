import ISOToReadable from "../../controllers/api/dateConverter";

export default function RequestCard({ requestItem }) {
  return (
    <div className="max-w-sm rounded-lg border border-rust-500 overflow-hidden shadow-lg bg-ice-100  bg-opacity-75 ">
      <img
        className="w-full"
        src="/img/card-top.jpg"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{requestItem?.name}</div>
        <p>{requestItem?.description}</p>
        <div>
          <p className="text-xs text-onyx-400 my-2">{requestItem?.category}</p>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2 bg-rust-300">
        <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold  mr-2 mb-2">
          {requestItem?.location}
        </span>

        <span className="inline-block rounded-full px-3 py-1 text-sm mr-2 mb-2">
          Posted on:{" "}
          <span className="font-semibold ">
            {ISOToReadable(requestItem?.updatedAt)}
          </span>
        </span>
      </div>
    </div>
  );
}
