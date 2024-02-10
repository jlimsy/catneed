import { NavLink } from "react-router-dom";

export default function PostalAlert() {
  return (
    <header className=" bg-rust-300 mb-5 mx-10 my-5 rounded-lg">
      <div className="max-w-screen-xl flex items-center justify-center mx-auto p-4">
        <div>
          <p className="inline-block mr-2">
            Update your postal code for optimal results:
          </p>
          <NavLink to="/settings">
            <button className="bg-drab-800 text-ice-100 hover:bg-sage-400 focus:ring-sage-500">
              Update
            </button>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
