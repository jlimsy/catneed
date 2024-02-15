import ChatTable from "../components/ChatPage/ChatTable";
import ChatModal from "../components/ChatPage/ChatModal";
import debug from "debug";
import { useEffect, useState } from "react";
import { allChats } from "../utilities/users-service";

const log = debug("catneed:pages:chatpage");
localStorage.debug = "catneed:*";

export default function ChatPage() {
  const [existingChats, setExistingChats] = useState([]);

  useEffect(() => {
    console.log("fetch existing Chats");

    const fetchAllChats = async () => {
      const chats = await allChats();
      setExistingChats(chats);
    };

    fetchAllChats();
  }, []);

  return (
    <section className="flex justify-center">
      <div>
        <ChatTable />
        <ChatModal />
      </div>
    </section>
  );
}
