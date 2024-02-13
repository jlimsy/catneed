import ChatTable from "../components/ChatPage/ChatTable";
import debug from "debug";

const log = debug("catneed:pages:chatpage");
localStorage.debug = "catneed:*";

export default function ChatPage() {
  return (
    <section className="flex justify-center">
      <div>
        <ChatTable />
      </div>
    </section>
  );
}
