import { useEffect, useState } from "react";
import PostalInput from "../components/SettingsPage/PostalInput";
import { userProfile } from "../utilities/users-service";
import { postalProfile } from "../utilities/postal-service";
import debug from "debug";

const log = debug("catneed:pages:SettingsPage");
localStorage.debug = "catneed:*";

export default function SettingsPage({ setPostalReminder }) {
  const [profile, setProfile] = useState({});
  const [postal, setPostal] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = await userProfile();
      setProfile(user);
      log("user", user);
    };

    const fetchPostal = async () => {
      const postalCode = await postalProfile();
      log("postalCode", postalCode);
      // setPostal(postalCode);
    };

    fetchUserProfile();
    fetchPostal();
  }, [postal]);

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1>Personal Info</h1>
      <p className="">
        Username: <span className="font-bold">{profile.username}</span>
      </p>
      <p>
        Email: <span className="font-bold">{profile.email}</span>
      </p>
      <p>
        Located at: <span className="font-bold">{profile.postal?.postal}</span>
      </p>
      <p>
        Account type:{" "}
        {profile.isAdmin ? (
          <span className="inline-block bg-sage-300 rounded-full px-3 py-1 text-sm font-bold mr-2 mb-2">
            Admin
          </span>
        ) : (
          <span className="font-bold">Member</span>
        )}
      </p>
      {!postal.postal && (
        <div>
          <PostalInput
            setPostal={setPostal}
            setPostalReminder={setPostalReminder}
          />
        </div>
      )}
    </div>
  );
}
