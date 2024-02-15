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
import { getUser } from "./utilities/users-service";
import { userProfile } from "./utilities/users-service";

import debug from "debug";

const log = debug("catneed:pages:app");
localStorage.debug = "catneed:*";

function App() {
  const [user, setUser] = useState(getUser());
  const [postalAlert, setPostalAlert] = useState(true);
  const [modal, setModal] = useState(false);
  const [chatId, setChatId] = useState("");
  const [chatUser, setChatUser] = useState("");
  const [feedback, setFeedback] = useState(false);

  log("user %o", user);

  useEffect(() => {
    // Fetch postal information when user data changes
    const fetchPostalInfo = async () => {
      try {
        const user = await userProfile();
        setPostalAlert(!user.postal?.postal);
        log("postalAlert %o", postalAlert);
      } catch (error) {
        console.error("Error fetching postal status:", error);
      }
    };

    fetchPostalInfo();
  }, [user]);

  return (
    <main>
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          {postalAlert && <PostalAlert />}
          <Routes>
            <Route
              path="/browse"
              element={
                <BrowsePage
                  user={user}
                  modal={modal}
                  setModal={setModal}
                  chatId={chatId}
                  setChatId={setChatId}
                  chatUser={chatUser}
                  setChatUser={setChatUser}
                />
              }
            />
            <Route
              path="/donate"
              element={
                <DonatePage
                  user={user}
                  feedback={feedback}
                  setFeedback={setFeedback}
                />
              }
            />
            <Route
              path="/request"
              element={
                <RequestPage
                  user={user}
                  feedback={feedback}
                  setFeedback={setFeedback}
                />
              }
            />
            <Route path="/listings" element={<ListingsPage user={user} />} />
            <Route
              path="/chat"
              element={
                <ChatPage
                  user={user}
                  modal={modal}
                  setModal={setModal}
                  chatId={chatId}
                  setChatId={setChatId}
                  chatUser={chatUser}
                  setChatUser={setChatUser}
                />
              }
            />
            {user.isAdmin && (
              <Route path="/dashboard" element={<DashboardPage />} />
            )}
            <Route
              path="/settings"
              element={
                <SettingsPage
                  user={user}
                  setPostalAlert={setPostalAlert}
                  postalAlert={postalAlert}
                />
              }
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
