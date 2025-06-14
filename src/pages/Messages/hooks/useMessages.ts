import { useQuery } from '@tanstack/react-query';
import { conversationsApi } from '../../../services/conversation.api';
import { useSelectedConversation } from '../../../store/messages.store';

function useMessages() {
  const {
    selectedConversation: { userId, mock, _id }
  } = useSelectedConversation();

  const { data, isLoading } = useQuery({
    queryKey: ['messages-conversation', userId],
    queryFn: () => conversationsApi.getAllMessages(userId),
    enabled: !mock && !!_id
  });

  return { messages: data?.data.data.messages, isLoading };
}

export default useMessages;
