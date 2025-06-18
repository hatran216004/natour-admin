import { useQuery, useQueryClient } from '@tanstack/react-query';
import { conversationsApi } from '../../../services/conversation.api';
import { useSelectedConversation } from '../../../store/messages.store';
import { AxiosResponse } from 'axios';
import { SuccessResponseApi } from '../../../types/utils.type';
import { Message, MessagesList } from '../../../types/messages.type';

function useMessages() {
  const queryClient = useQueryClient();
  const {
    selectedConversation: { userId, mock, _id }
  } = useSelectedConversation();

  const { data, isLoading } = useQuery({
    queryKey: ['messages-conversation', userId],
    queryFn: () => conversationsApi.getAllMessages(userId),
    enabled: !mock && !!_id
  });

  function handleUpdateMessages(newMessage: Message) {
    queryClient.setQueryData(
      ['messages-conversation', userId],
      (oldData: AxiosResponse<SuccessResponseApi<MessagesList>>) => {
        if (!oldData) return;
        const messages = oldData.data.data.messages;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            data: {
              ...oldData.data.data,
              messages: [...messages, newMessage]
            }
          }
        };
      }
    );
  }

  return {
    messages: data?.data.data.messages || [],
    isLoading,
    handleUpdateMessages
  };
}

export default useMessages;
