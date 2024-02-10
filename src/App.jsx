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
import { useEffect, useState } from "react";
import { getUser, getAdmin } from "./utilities/users-service";
import debug from "debug";

const log = debug("catneed:pages:app");
localStorage.debug = "catneed:*";

function App() {
  const [user, setUser] = useState(getUser());
  log("user %o", user);

  const [admin, setAdmin] = useState(getAdmin());
  log("admin %o", admin);

  // Retrieve admin status without needing to refresh page
  useEffect(() => {
    setAdmin(getAdmin());
  }, [user]);

  // console.log(user._id);

  return (
    <main>
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} admin={admin} />
          <Routes>
            <Route path="/browse" element={<BrowsePage user={user} />} />
            <Route path="/donate" element={<DonatePage user={user} />} />
            <Route path="/request" element={<RequestPage user={user} />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/chat" element={<ChatPage />} />
            {admin && <Route path="/dashboard" element={<DashboardPage />} />}
            <Route path="/settings" element={<SettingsPage />} />
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
