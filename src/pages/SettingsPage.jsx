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
    <>
      <h1>Personal Info</h1>
      <div>{profile.username}</div>
      <div>{profile.email}</div>
      <div>{profile.isAdmin ? "Admin" : ""}</div>
      <PostalModal />
    </>
  );
}
