import { useChatStore } from "../store/useChatStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-5xl h-[95vh] mx-auto border rounded-3xl overflow-hidden shadow-lg">
      <div className="flex h-full">

        {/* LEFT SIDE - Sidebar */}
        <div className="w-80 bg-[#111b21] flex flex-col border-r border-gray-700">
          {/* Profile + Search / Tabs */}
          <ProfileHeader />
          <ActiveTabSwitch />

          {/* Chats / Contacts */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE - Chat Window */}
        <div className="flex-1 flex flex-col bg-[#1e2a31]">
          {selectedUser ? (
            <ChatContainer />
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
