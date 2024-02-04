import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function NavBar({ admin }) {
  return (
    <header className="w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div>
          <NavLink to="/">CatNeed</NavLink>
        </div>
        {admin && <NavLink to="/dashboard">Admin </NavLink>}
        <NavLink to="/browse">Browse </NavLink>
        <NavLink to="/donate">Donate </NavLink>
        <NavLink to="/request">Request </NavLink>
        <NavLink to="/listings">My Listings </NavLink>
        <NavLink to="/chat">Chat </NavLink>
        <NavLink to="/about">About </NavLink>
        <button>
          <FaTimes />
        </button>
        <button>
          <FaBars />
        </button>
      </div>
    </header>
  );
}
