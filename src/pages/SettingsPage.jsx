import { useEffect, useState } from "react";
import { userProfile } from "../utilities/users-service";
import PostalInput from "../components/SettingsPage/PostalInput";
import debug from "debug";

const log = debug("catneed:pages:SettingsPage");
localStorage.debug = "catneed:*";

export default function SettingsPage({ user, setPostalAlert, postalAlert }) {
  log("user %o", user);

  const [postal, setPostal] = useState("");

  useEffect(() => {
    // Fetch postal information when user data changes
    const fetchPostalInfo = async () => {
      try {
        // Fetch user data from props
        const user = await userProfile();
        // Update component state with postal information
        setPostal(user.postal?.postal);
        // log("postal %o", postal);
      } catch (error) {
        console.error("Error fetching postal information:", error);
      }
    };

    fetchPostalInfo();
  }, [user, postal]);

  // const handlePostalUpdateLocal = (updatedPostal) => {
  //   setPostal(updatedPostal);
  //   handlePostalUpdate();
  // };

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1>Personal Info</h1>
      <p className="">
        Username: <span className="font-bold">{user.username}</span>
      </p>
      <p>
        Email: <span className="font-bold">{user.email}</span>
      </p>
      <p>
        Located at: <span className="font-bold">{postal}</span>
      </p>
      <p>
        Account type:{" "}
        {user.isAdmin ? (
          <span className="inline-block bg-sage-300 rounded-full px-3 py-1 text-sm font-bold mr-2 mb-2">
            Admin
          </span>
        ) : (
          <span className="font-bold">Member</span>
        )}
      </p>

      <div>
        {!postal && (
          <PostalInput
            setPostal={setPostal}
            setPostalAlert={setPostalAlert}
            postalAlert={postalAlert}
          />
        )}
      </div>
    </div>
  );
}
