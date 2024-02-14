import { useState } from "react";
import categories from "../../assets/categories";
import debug from "debug";

const log = debug("catneed:pages:BrowsePage");
localStorage.debug = "catneed:*";

export default function SearchBar({
  getSortByDist,
  filterByCat,
  searchByName,
}) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleQueryClick = () => {
    searchByName(query);
  };

  const handleChange = () => {
    getSortByDist();
  };

  const handleCategories = (event) => {
    filterByCat(event.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row w-1/2">
      <input type="text" onChange={handleInputChange} />
      <button
        type="submit"
        className="bg-drab-800 text-ice-100 hover:bg-rust-400 focus:ring-rust-500 mx-2"
        onClick={handleQueryClick}
      >
        Search
      </button>
      <label
        htmlFor="category"
        className="block my-auto mx-2 f font-medium text-gray-900 whitespace-nowrap	"
      >
        Select Category:
      </label>
      <select
        id="category"
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        defaultValue="Select category"
        onChange={handleCategories}
      >
        <option value="">Category</option>
        {Object.keys(categories).map((category) => (
          <option key={category} value={categories[category]}>
            {categories[category]}
          </option>
        ))}
      </select>

      <label
        htmlFor="category"
        className="block my-auto mx-2 font-medium text-gray-900 whitespace-nowrap	"
      >
        Sort by:
      </label>

      <select
        id="sort"
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        onChange={handleChange}
      >
        <option value="">Filter</option>
        <option value="distance">Distance</option>
        {/* <option value="condition">Condition</option>
        <option value="status">Status</option> */}
      </select>
    </div>
  );
}
