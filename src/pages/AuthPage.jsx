import LoginForm from "../components/AuthPage/LoginForm";
import ScrollDisplay from "../components/AuthPage/ScrollDisplay";
import SignUpForm from "../components/AuthPage/SignUpForm";
import { useEffect, useState } from "react";
import { getAll } from "../utilities/donate-service";
import debug from "debug";

const log = debug("catneed:pages:AuthPage");
localStorage.debug = "catneed:*";

export default function AuthPage({ setUser }) {
  const [newUser, setNewUser] = useState(false);
  const [browseItems, setBrowseItems] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const all = await getAll();
        setBrowseItems(all);
        log("browseItem %o", browseItems);
      } catch (error) {
        console.error("Error fetching items to browse:", error);
      }
    };

    fetchAll(); // Call the function to fetch donate listings when the component mounts
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 ">
      <div className="md:col-span-1 bg-ice-100">
        <div>
          <h1>Welcome to Catneed</h1>
        </div>

        <ScrollDisplay browseItems={browseItems} />
      </div>
      <div className="md:col-span-1 bg-gradient-to-r from-sage-200 to-rust-200">
        {newUser ? (
          <SignUpForm setNewUser={setNewUser} setUser={setUser} />
        ) : (
          <LoginForm setNewUser={setNewUser} setUser={setUser} />
        )}
      </div>
    </div>
  );
}
