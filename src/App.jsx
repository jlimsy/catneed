import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AuthPage from "./pages/AuthPage";
import BrowsePage from "./pages/BrowsePage";
import DonatePage from "./pages/DonatePage";
import RequestPage from "./pages/RequestPage";
import ListingsPage from "./pages/ListingsPage";
import ChatPage from "./pages/ChatPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/AboutPage";
import PostalAlert from "./components/BrowsePage/PostalAlert";
import { useEffect, useState } from "react";
import { getUser, getAdmin } from "./utilities/users-service";
import debug from "debug";
import { userProfile } from "./utilities/users-service";
import { postalProfile, getAllPostal } from "./utilities/postal-service";

const log = debug("catneed:pages:app");
localStorage.debug = "catneed:*";

function App() {
  const [user, setUser] = useState(getUser());
  log("user %o", user);

  const [admin, setAdmin] = useState(getAdmin());
  log("admin %o", admin);

  const [allPostal, setAllPostal] = useState(getAllPostal());

  const [postalReminder, setPostalReminder] = useState(false);

  // Retrieve admin status without needing to refresh page
  useEffect(() => {
    setAdmin(getAdmin());
    // setAllPostal(getAllPostal());

    const checkPostal = () => {
      const fetchUser = async () => {
        try {
          const postal = await postalProfile();
          log("postal %o", postal);

          if (postal?.postal === null) {
            setPostalReminder(true);

            log("user.postal %o", postal?.postal);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      fetchUser();
    };

    checkPostal();
  }, [user]);

  return (
    <main>
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} admin={admin} />
          {postalReminder && <PostalAlert />}
          <Routes>
            <Route path="/browse" element={<BrowsePage user={user} />} />
            <Route path="/donate" element={<DonatePage user={user} />} />
            <Route path="/request" element={<RequestPage user={user} />} />
            <Route path="/listings" element={<ListingsPage user={user} />} />
            <Route path="/chat" element={<ChatPage />} />
            {admin && <Route path="/dashboard" element={<DashboardPage />} />}
            <Route
              path="/settings"
              element={<SettingsPage setPostalReminder={setPostalReminder} />}
            />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
