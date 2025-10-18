import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  // Function to calculate relative last seen
  const getLastSeenText = (timestamp) => {
    if (!timestamp) return "Offline";

    const diff = Math.floor((Date.now() - new Date(timestamp)) / 1000); // seconds

    if (diff < 60) return "Last seen just now";
    if (diff < 3600) return `Last seen ${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `Last seen ${Math.floor(diff / 3600)} hours ago`;
    return `Last seen ${Math.floor(diff / 86400)} days ago`;
  };

  const lastSeenText = isOnline ? "Online" : getLastSeenText(selectedUser.lastSeen);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
   <div className="flex justify-between items-center bg-slate-800/50 border-slate-700/50 max-h-[65px] px-6 flex-1 
  p-3 backdrop-blur-md border-t rounded-b-xl shadow-lg">

      <div className="flex items-center space-x-3">
        {/* Avatar with online/offline dot */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden  border-2 border-cyan-200">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-800 ${
              isOnline ? "bg-green-500" : "bg-gray-500"
            }`}
          ></span>
        </div>

        {/* Name + Status */}
        <div>
          <h3 className="text-slate-100 font-serif pl-3 text-lg">{selectedUser.fullName}</h3>
          <p className="text-slate-500 text-sm pl-3">{lastSeenText}</p>
        </div>
      </div>

      {/* Close chat button */}
      <button onClick={() => setSelectedUser(null)}>
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
}

export default ChatHeader;
