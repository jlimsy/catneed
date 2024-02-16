import ChatTable from "../components/ChatPage/ChatTable";
import ChatModal from "../components/ChatPage/ChatModal";
import debug from "debug";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// import { allChats } from "../utilities/users-service";
import { allChats } from "../utilities/chats-service";

const log = debug("catneed:pages:chatpage");
localStorage.debug = "catneed:*";

let socket, selectedChatCompare;

export default function ChatPage({
  user,
  modal,
  setModal,
  chatId,
  setChatId,
  chatUser,
  setChatUser,
}) {
  const [existingChats, setExistingChats] = useState([]);

  // useEffect(() => {
  //   socket = io();
  //   socket.emit("setup", user);
  //   socket.on("connection", () => {
  //     setSocketConnected(true);
  //   });
  // }, []);

  useEffect(() => {
    console.log("fetch existing Chats");

    const fetchAllChats = async () => {
      const chats = await allChats();
      setExistingChats(chats);
      log("chats %o", chats);
    };

    fetchAllChats();
  }, [chatId]);

  useEffect(() => {
    setModal(false);
  }, [setModal]);

  const handleOpenChat = (chatId, chatUser) => {
    setModal(!modal);
    setChatId(chatId);
    setChatUser(chatUser);
    log("Open chat with ID:", chatId);
    log("chatUser:", chatUser);
    log("existingChats", existingChats);
  };

  return (
    <section className="flex justify-center">
      <div className="mx-5 my-10 p-10 bg-sage-300 rounded-lg bg-opacity-50">
        <ChatTable
          user={user}
          existingChats={existingChats}
          modal={modal}
          setModal={setModal}
          setChatId={setChatId}
          handleOpenChat={handleOpenChat}
        />
        {modal && (
          <ChatModal
            user={user}
            modal={modal}
            setModal={setModal}
            setChatId={setChatId}
            chatId={chatId}
            chatUser={chatUser}
            setChatUser={setChatUser}
          />
        )}
      </div>
    </section>
  );
}
