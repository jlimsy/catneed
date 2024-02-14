import ChatTable from "../components/ChatPage/ChatTable";
import ChatModal from "../components/ChatPage/ChatModal";
import debug from "debug";
import { io } from "socket.io-client";

const log = debug("catneed:pages:chatpage");
localStorage.debug = "catneed:*";

export default function ChatPage() {
  const socket = io();

  return (
    <section className="flex justify-center">
      <div>
        <ChatTable />
        <ChatModal />
      </div>
    </section>
  );
}
