import ISOToReadable from "../../controllers/api/dateConverter";

export default function ItemCard({ donateItem, browseItem }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full"
        src="/img/card-top.jpg"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {donateItem?.name}
          {browseItem?.name}
        </div>
        <p className="text-gray-700 text-base">
          {donateItem?.description} {browseItem?.description}
        </p>
        <p className="text-gray-700 text-base">
          {donateItem?.category} {browseItem?.category}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-copperfield-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
          {donateItem?.status}
          {browseItem?.status}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold  mr-2 mb-2">
          {donateItem?.location}
          {browseItem?.location}
        </span>

        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
          Posted on:{" "}
          {browseItem
            ? ISOToReadable(browseItem?.updatedAt)
            : ISOToReadable(donateItem?.createdAt)}
        </span>
      </div>
    </div>
  );
}
