import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  if (allContacts.length === 0) return (
    <p className="text-gray-400 text-center mt-4">No contacts found</p>
  );

  return (
    <div className="flex flex-col gap-4 p-5 m-2">
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-gradient-to-r from-cyan-600/10 to-blue-300/10 p-1.5 rounded-xl cursor-pointer 
                     hover:scale-105 hover:shadow-lg transition-all duration-200"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-4">
            {/* Avatar with online/offline indicator */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className={`absolute bottom-0 right-1 w-3 h-3 rounded-full border border-slate-900
                            ${onlineUsers.includes(contact._id) ? "bg-green-400" : "bg-gray-500"}`}
              />
            </div>

            {/* Contact info */}
            <div className="flex-1 flex flex-col">
              <h4 className="text-white font-mono text-lg truncate">{contact.fullName}</h4>
              {contact.lastMessage && (
                <p className="text-gray-400 text-sm truncate">
                  {contact.lastMessage.length > 30
                    ? contact.lastMessage.substring(0, 30) + "..."
                    : contact.lastMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactList;
