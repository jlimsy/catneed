import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AuthPage from "./pages/AuthPage";
import BrowsePage from "./pages/BrowsePage";
import DonatePage from "./pages/DonatePage";
import RequestPage from "./pages/RequestPage";
import ListingsPage from "./pages/ListingsPage";
import ChatPage from "./pages/ChatPage";
import DashboardPage from "./pages/DashboardPage";
import AboutPage from "./pages/AboutPage";
import { useState } from "react";
import { getUser } from "./utilities/users-service";

function App() {
  const [user, setUser] = useState(getUser());
  const [admin, setAdmin] = useState(false);

  return (
    <main>
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} admin={admin} />
          <Routes>
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/request" element={<RequestPage />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/chat" element={<ChatPage />} />
            {admin && <Route path="/dashboard" element={<DashboardPage />} />}
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
