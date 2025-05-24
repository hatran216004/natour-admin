import { useEffect } from 'react';
import useConversations from '../hooks/useConversations';
import ConversationItem from './ConversationItem';
import ConversationSkeleton from './ConversationSkeleton';
import ConversationsList from './ConversationsList';
import { useConversationsStore } from '../../../store/messages.store';
import Search from '../../../components/Search';

export default function ConversationsSection() {
  const { conversations, isLoading } = useConversations();
  const { conversations: conversationsStore, setConversations } =
    useConversationsStore();

  useEffect(() => {
    if (conversations.length) {
      setConversations(conversations);
    }
  }, [conversations, setConversations]);

  if (!isLoading && !conversationsStore.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 px-4">
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 8h10M7 12h4m1 8a9 9 0 100-18 9 9 0 000 18zm4.5-4.5L21 21"
            />
          </svg>
        </div>
        <h2 className="text-lg font-semibold mb-1">No conversation found</h2>
      </div>
    );
  }

  return (
    <div className="py-4 h-full shadow-lg rounded-lg">
      <div className="px-4">
        <Search />
        <h4 className="font-semibold text-lg mt-2">
          Messages ({!isLoading ? conversationsStore?.length : 0})
        </h4>
      </div>
      {isLoading && (
        <div className="px-4">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="pr-4 flex flex-col justify-center">
                <ConversationSkeleton />
              </div>
            ))}
        </div>
      )}
      {!isLoading && (
        <ConversationsList
          data={conversationsStore!}
          render={(conversation) => (
            <ConversationItem
              key={conversation._id}
              conversation={conversation}
            />
          )}
        />
      )}
    </div>
  );
}
