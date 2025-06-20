import { useQuery, useQueryClient } from '@tanstack/react-query';
import { conversationsApi } from '../../../services/conversation.api';
import { useSelectedConversation } from '../../../store/messages.store';
import { AxiosResponse } from 'axios';
import { SuccessResponseApi } from '../../../types/utils.type';
import { Message, MessagesList } from '../../../types/messages.type';
import { produce } from 'immer';

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

  function handleUpdateMessages(
    data: Message | Message[],
    updateSeen: boolean = false
  ) {
    const queryKey = ['messages-conversation', userId];
    queryClient.setQueryData(
      queryKey,
      (oldData: AxiosResponse<SuccessResponseApi<MessagesList>>) => {
        if (!oldData) return;

        return produce(oldData, (draft) => {
          const messages = draft.data.data.messages;
          if (!updateSeen) {
            messages.push(data as Message);
          } else {
            if (messages.length > 0) {
              (data as Message[]).forEach((msg) => {
                const index = messages.findIndex((m) => m._id === msg._id);
                if (index !== -1) {
                  messages[index].isSeen = msg.isSeen;
                }
              });
            }
          }
        });
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
