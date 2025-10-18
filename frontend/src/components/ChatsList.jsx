import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="flex flex-col gap-4 p-5 m-2">
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-gradient-to-r from-cyan-600/10 to-blue-300/10 p-1.5 rounded-xl cursor-pointer 
                     hover:scale-105 hover:shadow-lg transition-all duration-200"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-4">
            {/* Avatar with online/offline indicator */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400">
                <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} className="w-full h-full object-cover" />
              </div>
              <span
                className={`absolute bottom-0 right-1 w-3 h-3 rounded-full border border-slate-900
                            ${onlineUsers.includes(chat._id) ? "bg-green-400" : "bg-gray-500"}`}
              />
            </div>

            {/* User info */}
            <div className="flex-1 flex flex-col">
              <h4 className="text-white font-mono text-lg truncate">{chat.fullName}</h4>
              {chat.lastMessage && (
                <p className="text-gray-400 text-sm truncate">
                  {chat.lastMessage.length > 30
                    ? chat.lastMessage.substring(0, 30) + "..."
                    : chat.lastMessage}
                </p>
              )}
            </div>

            

            
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatsList;
