import { useAuthStore } from '../../../store/auth.store';
import { Conversation } from '../../../types/conversations.type';
import { useSelectedConversation } from '../../../store/messages.store';
import classNames from 'classnames';
import { timeAgo } from '../../../utils/helpers';
import { useSocket } from '../../../context/SocketContext';

export default function ConversationItem({
  conversation
}: {
  conversation: Conversation;
}) {
  const { onlineUsers } = useSocket();
  const { user } = useAuthStore();
  const { selectedConversation, setSelectedConversation } =
    useSelectedConversation();

  const recipient = conversation.participants[0];
  const lastMessage = conversation.lastMessage;
  const isActive = selectedConversation._id === conversation._id;

  const messageElements = Array.from(lastMessage?.text);
  const message =
    messageElements.length > 20
      ? messageElements.slice(0, 10).join('') + '...'
      : lastMessage?.text;

  function handleSelectecConversation() {
    setSelectedConversation({
      _id: conversation._id,
      photo: recipient.photo,
      userId: recipient._id,
      username: recipient.name,
      email: recipient.email,
      mock: conversation.mock
    });
  }

  return (
    <li
      className={classNames(
        'cursor-pointer hover:opacity-90 p-2 rounded-lg shadow-sm',
        {
          'bg-gray-200': isActive,
          'bg-white': !isActive
        }
      )}
      onClick={handleSelectecConversation}
    >
      <div className="flex items-center ">
        <figure className="relative flex-shrink-0 mr-4">
          <img
            className="w-10 h-10 object-cover rounded-full"
            src={`${import.meta.env.VITE_IMG_URL}/users/${recipient?.photo}`}
            alt={recipient?.name}
          />
          <span
            className={classNames(
              'w-3 h-3 border-gray-600 border-2 rounded-full absolute right-0 bottom-0',
              {
                'bg-green-500': onlineUsers.includes(recipient._id),
                'bg-gray-400': !onlineUsers.includes(recipient._id)
              }
            )}
          ></span>
        </figure>
        <div className="flex-1">
          <h2 className="text-main line-clamp-1 text-sm font-bold capitalize">
            {recipient?.name}
          </h2>
          <div className="flex items-center gap-1 mt-1">
            <p className="text-gray-600 font-medium text-sm max-w-[170px] line-clamp-1 break-words">
              {user?._id === lastMessage?.sender && 'You: '}
              {message}
            </p>
          </div>
        </div>
        <span className="ml-auto mb-auto text-xs">
          {!conversation.mock && timeAgo(conversation.updatedAt)}
        </span>
      </div>
    </li>
  );
}
