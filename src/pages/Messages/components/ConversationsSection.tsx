import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useConversationsStore } from '../../../store/messages.store';
import { userApi } from '../../../services/user.api';
import useDebounce from '../../../hooks/useDebounce';
import useConversations from '../hooks/useConversations';
import ConversationItem from './ConversationItem';
import ConversationSkeleton from './ConversationSkeleton';
import ConversationsList from './ConversationsList';
import Search from '../../../components/Search';
import useUrl from '../../../hooks/useUrl';
import EmptyConversations from './EmptyConversations';
import { Conversation } from '../../../types/conversations.type';
import { useAuthStore } from '../../../store/auth.store';

export default function ConversationsSection() {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuthStore();
  const { conversations, isLoading } = useConversations();
  const { conversations: conversationsStore, setConversations } =
    useConversationsStore();

  const { currentValue: searchValue } = useUrl({ field: 'search' });
  const debounceValue = useDebounce(searchValue);

  const {
    data: searchData,
    isLoading: isFetchingUsers,
    isSuccess
  } = useQuery({
    queryKey: ['conversations-search', debounceValue],
    queryFn: () => userApi.searchUsers((debounceValue as string).trim()),
    enabled: !!debounceValue
  });

  useEffect(() => {
    if (conversations && !searchValue) {
      const cloneConversations = conversations
        .map((ele) => ({
          ...ele,
          mock: false
        }))
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      setConversations(cloneConversations);
    }
  }, [conversations, searchValue, setConversations]);

  useEffect(() => {
    if (debounceValue && isSuccess && conversations) {
      const users = searchData?.data?.data?.users;

      const newConversations: Conversation[] = users
        .map((user, index) => {
          const isExistConversation = conversations.find(
            (ele) => ele.participants[0]._id === user._id
          );
          if (isExistConversation)
            return { ...isExistConversation, mock: false };
          return {
            _id: index.toString(),
            lastMessage: {
              text: '',
              sender: user._id
            },
            participants: [
              {
                _id: user._id,
                name: user.name,
                email: user.email,
                photo: user.photo
              }
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
            mock: true
          };
        })
        .filter((conv) => conv.participants[0]._id !== currentUser?._id);
      setConversations(newConversations);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, conversations, debounceValue, conversations]);

  return (
    <div className="py-4 h-full shadow-lg rounded-lg relative">
      <div className="px-4">
        <Search
          handleClearInput={() =>
            queryClient.invalidateQueries({
              queryKey: ['conversations']
            })
          }
          isLoading={isFetchingUsers}
        />
        <h4 className="font-semibold text-lg mt-2">
          Messages ({!isLoading ? conversationsStore?.length : 0})
        </h4>
      </div>

      {!isLoading && !conversationsStore.length && <EmptyConversations />}

      {isLoading && (
        <div className="px-4">
          {Array(3)
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
