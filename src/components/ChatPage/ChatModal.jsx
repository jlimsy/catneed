import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { getAllMessages } from "../../utilities/messages-service";

import debug from "debug";
const log = debug("catneed:pages:ChatModal");

export default function ChatModal() {
  // const [socket, setSocket] = useState(null);
  // const [message, setMessage] = useState("");

  const [chat, setChat] = useState([]);
  const [messages, setMessages] = useState("");

  // useEffect(() => {
  //   setSocket(io());
  // }, []);

  // useEffect(() => {
  //   if (!socket) return;

  //   socket.on("message-from-server", (data) => {
  //     setChat((prev) => [...prev, data.message]);
  //     console.log("messaged received from server", data);
  //   });
  // }, [socket]);

  useEffect(() => {
    const fetchAllMessages = async () => {
      const allMessages = await getAllMessages();
      setMessages(allMessages);
      log("messages %o", messages);
      log("allMessages %o", allMessages);
    };

    fetchAllMessages();
  }, []);

  const handleTextInput = (event) => {
    // setMessage(event.target.value);
    // console.log(message);
  };

  const handleSend = (event) => {
    event.preventDefault();
    // console.log(message, "send button clicked!");
    // socket.emit("send-message", { message });

    // setMessage("");
  };

  return (
    <div className="flex flex-col">
      <h1>You chat with XXX</h1>
      <div className="bg-ice-100">Conversation here</div>
      {/* {messages.map((msg) => {
        msg.content;
      })} */}
      <input
        type="text"
        className="bg-ice-100 birder"
        placeholder="your message here"
        // value={message}
        onChange={handleTextInput}
      />
      <button type="submit" onClick={handleSend}>
        Send
      </button>
    </div>
  );
}
