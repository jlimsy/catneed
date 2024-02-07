import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import * as userService from "../utilities/users-service";

export default function NavBar({ user, setUser, admin }) {
  const handleLogOut = () => {
    userService.logOut();
    setUser(null);
  };

  return (
    <header className="w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div>
          <NavLink to="/">CatNeed</NavLink>
        </div>
        <h1>Welcome, {user.username}!</h1>
        <NavLink to="/browse">Browse </NavLink>
        <NavLink to="/donate">Donate </NavLink>
        <NavLink to="/request">Request </NavLink>
        <NavLink to="/listings">My Listings </NavLink>
        <NavLink to="/chat">Chat </NavLink>
        {admin && <NavLink to="/dashboard">Dashboard</NavLink>}
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
