import { useEffect } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import useConversations from '../hooks/useConversations';
import ConversationItem from './ConversationItem';
import ConversationSkeleton from './ConversationSkeleton';
import ConversationsList from './ConversationsList';
import Search from '../../../components/Search';
import useUrl from '../../../hooks/useUrl';
import EmptyConversations from './EmptyConversations';
import { useConversationsStore } from '../../../store/messages.store';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '../../../services/user.api';

export default function ConversationsSection() {
  const { conversations, isLoading } = useConversations();
  const { conversations: conversationsStore, setConversations } =
    useConversationsStore();

  const { currentValue: searchValue } = useUrl({ field: 'search' });
  const debounceValue = useDebounce(searchValue);
  const {
    data,
    isLoading: isFetchingUsers,
    isSuccess
  } = useQuery({
    queryKey: ['conversations-search', debounceValue],
    queryFn: () => userApi.searchUsers((debounceValue as string).trim()),
    enabled: !!debounceValue
  });

  useEffect(() => {
    if (conversations.length && !isSuccess) {
      setConversations(conversations);
    }
  }, [conversations, isSuccess, setConversations]);

  useEffect(() => {
    console.log('2');
    if (isSuccess) {
      const users = data.data.data.users;
      const userIds = users.map((user) => user._id);

      const newConversations = conversationsStore.filter((conv) =>
        userIds.includes(conv.participants[0]._id)
      );
      setConversations(newConversations);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className="py-4 h-full shadow-lg rounded-lg relative">
      <div className="px-4">
        <Search
          handleClearInput={() => setConversations(conversations)}
          isLoading={isFetchingUsers}
        />
        <h4 className="font-semibold text-lg mt-2">
          Messages ({!isLoading ? conversationsStore?.length : 0})
        </h4>
      </div>

      {!isLoading && !conversationsStore.length && <EmptyConversations />}

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
