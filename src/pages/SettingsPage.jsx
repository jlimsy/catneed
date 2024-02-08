import { useEffect, useState } from "react";
import PostalModal from "../components/SettingsPage/PostalModal";
import { userProfile } from "../utilities/users-service";

export default function SettingsPage() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = await userProfile();
      setProfile(user);
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1>Personal Info</h1>
      <p className="">
        Username: <span className="font-bold"> {profile.username}</span>
      </p>
      <p>
        Email: <span className="font-bold"> {profile.email}</span>
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
      <PostalModal />
    </div>
  );
}
