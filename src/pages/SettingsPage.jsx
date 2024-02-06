import { useEffect } from "react";
import PostalModal from "../components/SettingsPage/PostalModal";
import { userProfile } from "../utilities/users-service";

export default function SettingsPage() {
  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = await userProfile();
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      <h1>Personal Info</h1>
      <PostalModal />
    </>
  );
}
