import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AuthPage from "./pages/AuthPage";
import BrowsePage from "./pages/BrowsePage";
import DonatePage from "./pages/DonatePage";
import RequestPage from "./pages/RequestPage";
import ListingsPage from "./pages/ListingsPage";
import ChatPage from "./pages/ChatPage";
import AdminPage from "./pages/AdminPage";
import AboutPage from "./pages/AboutPage";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);

  return (
    <main>
      {user ? (
        <>
          <NavBar admin={admin} />
          <Routes>
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/request" element={<RequestPage />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/chat" element={<ChatPage />} />
            {admin && <Route path="/admin" element={<AdminPage />} />}
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage />
      )}
    </main>
  );
}

export default App;
