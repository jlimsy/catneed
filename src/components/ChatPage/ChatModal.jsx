import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { getAllMessages, postMessage } from "../../utilities/messages-service";

import debug from "debug";
const log = debug("catneed:pages:ChatModal");

export default function ChatModal({ modal, setModal, chatId }) {
  const [socket, setSocket] = useState(null);
  // const [message, setMessage] = useState("");

  const [chat, setChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // useEffect(() => {
  //   setSocket(io());
  //   console.log("is this working");
  // }, []);

  // useEffect(() => {
  //   if (!socket) return;
  //   socket.emit("setup");
  //   socket.on("message-from-server", (data) => {
  //     setChat((prev) => [...prev, data.message]);
  //     console.log("messaged received from server", data);
  //   });
  // }, [socket]);

  useEffect(() => {
    const fetchAllMessages = async () => {
      // log("chatId %o", chatId);

      if (chatId) {
        const allMessages = await getAllMessages(chatId);
        setMessages(allMessages);

        // log("allMessages %o", allMessages);

        // socket.emit("join chat");
      }
    };

    fetchAllMessages();
  }, [chatId]);

  // log("messages %o", messages);

  const handleTextInput = (event) => {
    setNewMessage(event.target.value);
    // console.log(message);
  };

  const handleSend = async (event) => {
    event.preventDefault();

    // if (!newMessage.length > 0) {
    //   alert("Please type a message.");
    // }

    const chatData = {
      content: newMessage,
      chat: chatId,
    };

    log("chatData %o", chatData);
    const message = await postMessage(chatData);
    log("message %o", message);

    // console.log(message, "send button clicked!");
    // socket.emit("send-message", { newMessage });

    setNewMessage("");
    setMessages([...messages], message);
  };

  const handleClick = () => {
    setModal(!modal);
  };

  return (
    <div className="fixed left-0 top-0 z-[1055]  h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-onyx-950 bg-opacity-75">
      <div
        id="chat-container"
        className="fixed top-1/2 left-1/2 bg-gradient-to-r from-sage-200 to-rust-200 border-drab-800  rounded-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out"
      >
        <div className="p-4 border-b bg-sage-400 text-white rounded-t-lg flex justify-between items-center">
          <p className="text-lg font-semibold">Admin Bot</p>
          <button id="close-chat" onClick={handleClick}>
            x
          </button>
        </div>
        <div id="chatbox" className="p-4 h-80 overflow-y-auto">
          {messages.map((message, idx) => (
            <div key={idx} className="mb-2 text-right">
              <p className="bg-sage-300 text-white rounded-lg py-2 px-4 inline-block">
                {message?.content}
              </p>
            </div>
          ))}

          <div className="mb-2">
            <p className="bg-ice-100 text-ice-700 rounded-lg py-2 px-4 inline-block">
              This is a response from the chatbot.
            </p>
          </div>
        </div>
        <div className="p-4 border-t border-sage-400 flex">
          <input
            id="user-input"
            type="text"
            placeholder="Type a message"
            className="w-full px-3 py-2 border mr-4 rounded-l-md focus:outline-none focus:ring-2 focus:ring-sage-500"
            onChange={handleTextInput}
            value={newMessage}
          />
          <button
            id="send-button"
            className="bg-rust-500 text-ice-50 px-4 py-2 rounded-r-md hover:bg-sage-600 transition duration-300"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
