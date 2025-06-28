/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQueryClient } from '@tanstack/react-query';
import { Socket } from 'socket.io-client';

import {
  useConversationsStore,
  useMessages,
  useSelectedConversation
} from '../store/messages.store';
import { useAuthStore } from '../store/auth.store';

import { CHAT_EVENTS } from '../services/socket/events';

import { Message, UnReadCountUpdatedData } from '../types/messages.type';

function useSocketHandlers(socket: Socket | null) {
  const queryClient = useQueryClient();

  const { conversations, setConversations } = useConversationsStore();
  const { user } = useAuthStore();
  const { addMessage } = useMessages();
  const { selectedConversation, setSelectedConversation } =
    useSelectedConversation();

  const handleStartNewConversation = (conversationId: string) => {
    const existingConversation = conversations?.find(
      (conv) => conv._id === conversationId
    );

    if (!existingConversation) {
      queryClient.invalidateQueries({
        queryKey: ['conversations']
      });
    }
  };

  const handleMessageSent = (message: Message) => {
    addMessage(message);

    const { text, sender, conversationId, updatedAt } = message;

    if (selectedConversation.mock) {
      setSelectedConversation({
        ...selectedConversation,
        _id: conversationId,
        mock: false
      });

      setConversations(
        conversations.map((conv) =>
          conv._id === selectedConversation._id
            ? {
                ...conv,
                _id: conversationId,
                lastMessage: { text, sender },
                mock: false,
                updatedAt
              }
            : conv
        )
      );

      queryClient.invalidateQueries({
        queryKey: ['conversations']
      });
    }

    socket?.emit(CHAT_EVENTS.STOP_TYPING, {
      recipientId: selectedConversation.userId,
      conversationId
    });
  };

  const handleNewMesage = (message: Message) => {
    const { conversationId, sender } = message;
    handleStartNewConversation(conversationId);

    if (message.conversationId === selectedConversation._id) {
      addMessage(message);
    } else {
      socket?.emit(CHAT_EVENTS.UPDATE_UNREAD_COUNT, {
        conversationId,
        recipientId: user?._id
      });
    }

    setConversations(
      conversations?.map((conv) =>
        conv._id === conversationId
          ? {
              ...conv,
              lastMessage: { sender, text: message.text }
            }
          : conv
      )
    );
  };

  const handleUpdateUnreadCount = (data: UnReadCountUpdatedData) => {
    setConversations(
      conversations.map((conv) =>
        conv._id === data.conversationId
          ? { ...conv, unreadCount: data.unreadCount }
          : conv
      )
    );
  };

  return {
    handleNewMesage,
    handleMessageSent,
    handleUpdateUnreadCount
  };
}

export default useSocketHandlers;

/*
  const handleUpdateMessages = (
    data: Message | string[],
    updateSeen: boolean = false
  ) => {
    const queryKey = [
      'messages-conversation',
      (data as Message).conversationId
    ];
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
              (data as string[]).forEach((id) => {
                const index = messages.findIndex((m) => m._id === id);
                if (index !== -1) {
                  messages[index].isSeen = true;
                }
              });
            }
          }
        });
      }
    );
  };
*/
