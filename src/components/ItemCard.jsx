import ISOToReadable from "../../controllers/api/dateConverter";

export default function ItemCard({ donateItem }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full"
        src="/img/card-top.jpg"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{donateItem?.name}</div>
        <p className="text-gray-700 text-base"> {donateItem?.description}</p>
        <p className="text-gray-700 text-base"> {donateItem?.category}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {donateItem?.status}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {donateItem?.location}
        </span>
        Posted on:
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {ISOToReadable(donateItem?.updatedAt)}
        </span>
      </div>
    </div>
  );
}
