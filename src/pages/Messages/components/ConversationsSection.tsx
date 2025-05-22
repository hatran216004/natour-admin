import Skeleton from '../../../components/Skeleton/Skeleton';
import useConversations from '../hooks/useConversations';
import ConversationItem from './ConversationItem';
import ConversationsList from './ConversationsList';

export default function ConversationsSection() {
  const { conversations, isLoading } = useConversations();

  if (!isLoading && !conversations) {
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
    <div className="py-4 h-full">
      {isLoading && (
        <div className="pr-4 flex flex-col justify-center">
          <Skeleton size="md" />
          <Skeleton size="md" />
        </div>
      )}
      {!isLoading && (
        <>
          <h4 className="font-semibold text-lg">
            Messages ({conversations?.length})
          </h4>
          <ConversationsList
            data={conversations!}
            render={(conversation) => (
              <ConversationItem
                key={conversation._id}
                conversation={conversation}
              />
            )}
          />
        </>
      )}
    </div>
  );
}
