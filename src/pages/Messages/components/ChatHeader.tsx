import { useSelectedConversation } from '../../../store/messages.store';

export default function ChatHeader() {
  const { selectedConversation } = useSelectedConversation();

  if (!selectedConversation.userId) return null;

  return (
    <div className="pb-3 px-4 border-b-2 border-gray-100">
      <div className="flex gap-[14px] items-center">
        <figure className="relative">
          <img
            className="w-10 h-10 object-cover rounded-full"
            src={`${import.meta.env.VITE_API_BASE_URL}/img/users/${
              selectedConversation?.photo
            }`}
            alt={selectedConversation?.username}
          />
          <span className="w-3 h-3 border-gray-600 border-2 rounded-full bg-green-500 absolute right-0 bottom-0"></span>
        </figure>
        <div>
          <h2 className="text-main text-sm font-bold capitalize">
            {selectedConversation?.username}
          </h2>
          <h2 className="text-[#718096] text-sm">
            {selectedConversation?.email}
          </h2>
        </div>
      </div>
    </div>
  );
}
