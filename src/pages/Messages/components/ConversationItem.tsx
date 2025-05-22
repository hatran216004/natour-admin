import { useAuthStore } from '../../../store/auth.store';
import { CiCircleCheck } from 'react-icons/ci';
import { Conversation } from '../../../types/conversations.type';
import { useSelectedConversation } from '../../../store/messages.store';

export default function ConversationItem({
  conversation
}: {
  conversation: Conversation;
}) {
  const recipient = conversation.participants[0];
  const lastMessage = conversation.lastMessage;
  const { user } = useAuthStore();
  const { setSelectedConversation } = useSelectedConversation();

  function handleSelectecConversation() {
    setSelectedConversation({
      _id: conversation._id,
      photo: recipient.photo,
      userId: recipient._id,
      username: recipient.name,
      email: recipient.email
    });
  }

  return (
    <li
      className="cursor-pointer hover:opacity-90 p-2 bg-slate-200 rounded-lg shadow-sm"
      onClick={handleSelectecConversation}
    >
      <div className="flex items-center ">
        <figure className="relative flex-shrink-0 mr-4">
          <img
            className="w-10 h-10 object-cover rounded-full"
            src={`${import.meta.env.VITE_API_BASE_URL}/img/users/${
              recipient?.photo
            }`}
            alt={recipient?.name}
          />
          <span className="w-3 h-3 border-gray-600 border-2 rounded-full bg-green-500 absolute right-0 bottom-0"></span>
        </figure>
        <div className="flex-1">
          <h2 className="text-main line-clamp-1 text-sm font-bold capitalize">
            {recipient?.name}
          </h2>
          <div className="flex items-center gap-1 mt-1">
            {user?._id === lastMessage?.sender && (
              <CiCircleCheck size={18} className="flex-shrink-0" />
            )}
            <p className="text-gray-600 font-medium text-sm max-w-[170px] line-clamp-1 break-words">
              {lastMessage?.text}
            </p>
          </div>
        </div>
        <span className="ml-auto mb-auto text-xs">5 minutes ago</span>
      </div>
    </li>
  );
}
