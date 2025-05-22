import { useQuery } from '@tanstack/react-query';
import { conversationsApi } from '../../../services/conversation.api';

function useMessages(userId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['messages-conversation', userId],
    queryFn: () => conversationsApi.getAllMessages(userId)
  });

  return { messages: data?.data.data.messages || [], isLoading };
}

export default useMessages;
