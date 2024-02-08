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
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <p>{profile.isAdmin ? "Admin" : ""}</p>
      <PostalModal />
    </div>
  );
}
