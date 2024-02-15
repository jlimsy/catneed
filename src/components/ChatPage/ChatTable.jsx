import debug from "debug";
import { useState } from "react";
const log = debug("catneed:pages:chatpage");

export default function ChatTable({
  existingChats,
  modal,
  setModal,
  setChatId,
  handleOpenChat,
}) {
  // const [chatId, setChatId] = useState("");

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text font-bold text-gray-500 uppercase"
                  >
                    User
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-center text font-bold text-gray-500 uppercase"
                  >
                    Last message
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text font-bold text-gray-500 uppercase"
                  >
                    Chat
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {existingChats.map((chat) => (
                  <tr
                    key={chat?.users[1].username}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {chat?.users[1].username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                      {chat?.latestMessage?.content}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <button
                        type="button"
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => handleOpenChat(chat?._id)}
                      >
                        Chat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
