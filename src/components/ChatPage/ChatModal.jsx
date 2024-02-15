import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export default function ChatModal() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    setSocket(io());
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("message-from-server", (data) => {
      setChat((prev) => [...prev, data.message]);
      console.log("messaged received from server", data);
    });
  }, [socket]);

  const handleTextInput = (event) => {
    setMessage(event.target.value);
    // console.log(message);
  };

  const handleSend = (event) => {
    event.preventDefault();
    console.log(message, "send button clicked!");
    socket.emit("send-message", { message });

    setMessage("");
  };

  return (
    <div className="flex flex-col">
      <h1>You chat with XXX</h1>
      <div className="bg-ice-100">Conversation here</div>

      {chat.map((message, idx) => (
        <div key={idx} className="bg-rust-200">
          {message}
        </div>
      ))}
      <input
        type="text"
        className="bg-ice-100 birder"
        placeholder="your message here"
        value={message}
        onChange={handleTextInput}
      />
      <button type="submit" onClick={handleSend}>
        Send
      </button>
    </div>
  );
}
