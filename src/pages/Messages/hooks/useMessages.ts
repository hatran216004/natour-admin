import { useQuery } from '@tanstack/react-query';
import { conversationsApi } from '../../../services/conversation.api';
import { useSelectedConversation } from '../../../store/messages.store';

function useMessages() {
  const {
    selectedConversation: { userId, mock }
  } = useSelectedConversation();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['messages-conversation', userId],
    queryFn: () => conversationsApi.getAllMessages(userId),
    enabled: !mock
  });

  return { messages: data?.data.data.messages || [], isLoading, refetch };
}

export default useMessages;
