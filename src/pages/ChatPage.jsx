import ChatTable from "../components/ChatPage/ChatTable";
import ChatModal from "../components/ChatPage/ChatModal";
import debug from "debug";
import { useEffect, useState } from "react";
// import { allChats } from "../utilities/users-service";
import { allChats } from "../utilities/chats-service";

const log = debug("catneed:pages:chatpage");
localStorage.debug = "catneed:*";

export default function ChatPage({ modal, setModal }) {
  const [existingChats, setExistingChats] = useState([]);
  const [chatId, setChatId] = useState("");

  useEffect(() => {
    console.log("fetch existing Chats");

    const fetchAllChats = async () => {
      const chats = await allChats();
      setExistingChats(chats);
      log("chats %o", chats);
    };

    fetchAllChats();
  }, []);

  const handleOpenChat = (chatId) => {
    setModal(!modal);
    setChatId(chatId);
    log("Open chat with ID:", chatId);
    log("existingChats", existingChats);
  };

  return (
    <section className="flex justify-center">
      <div className="mx-5 my-10 p-10 bg-sage-300 rounded-lg bg-opacity-50">
        <ChatTable
          existingChats={existingChats}
          modal={modal}
          setModal={setModal}
          setChatId={setChatId}
          handleOpenChat={handleOpenChat}
        />
        {modal || (
          <ChatModal
            modal={modal}
            setModal={setModal}
            setChatId={setChatId}
            chatId={chatId}
          />
        )}
      </div>
    </section>
  );
}
