import { useQuery } from '@tanstack/react-query';
import { conversationsApi } from '../../../services/conversation.api';

function useConversations() {
  const { data, isLoading } = useQuery({
    queryKey: ['conversations'],
    queryFn: conversationsApi.getUserConversations
  });
  return { conversations: data?.data.data.conversations, isLoading };
}

export default useConversations;
