import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import * as userService from "../utilities/users-service";

export default function NavBar({ user, setUser }) {
  const handleLogOut = () => {
    userService.logOut();
    setUser(null);
  };

  return (
    <header className="w-full  bg-sage-300">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div>
          <NavLink to="/browse">
            {" "}
            <h1 className="font-bold">CatNeed</h1>
          </NavLink>
        </div>
        <p className="font-bold italic">Welcome, {user.username}!</p>
        <NavLink to="/browse">Browse </NavLink>
        <NavLink to="/donate">Donate </NavLink>
        <NavLink to="/request">Request </NavLink>
        <NavLink to="/listings">My Listings </NavLink>
        <NavLink to="/chat">Chat </NavLink>
        {user.isAdmin && (
          <NavLink to="/dashboard">
            <span className="text-rust-600">Dashboard</span>
          </NavLink>
        )}
        {user ? (
          <NavLink to="/settings">Settings</NavLink>
        ) : (
          <NavLink to="/about">About </NavLink>
        )}

        <NavLink to="/" onClick={handleLogOut}>
          Log Out
        </NavLink>
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
