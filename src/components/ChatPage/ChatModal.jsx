export default function ChatModal() {
  return (
    <div className="flex flex-col">
      <h1>You chat with XXX</h1>
      <div className="bg-ice-100">Conversation here</div>
      <input
        type="text"
        className="bg-ice-100 birder"
        placeholder="your message here"
      />
      <button type="submit">Send</button>
    </div>
  );
}
