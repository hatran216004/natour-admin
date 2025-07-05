import { useCallback, useEffect } from 'react';
import {
  Message,
  MessagesSeenConfirmData,
  UnReadCountUpdatedData
} from '../types/messages.type';
import useSocketHandlers from './useSocketHandlers';
import { CHAT_EVENTS } from '../services/socket/events';
import { useAuthStore } from '../store/auth.store';
import { Socket } from 'socket.io-client';
import { useMessages } from '../store/messages.store';

function useChatEvents(socket: Socket | null) {
  const { user } = useAuthStore();
  const { messages, getLastMessage } = useMessages();
  const { handleMessageSent, handleNewMesage, handleUpdateUnreadCount } =
    useSocketHandlers(socket);
  const { updateMessages } = useMessages();

  const tryEmitSeenMessage = useCallback(() => {
    if (!socket || !user) return;

    const unSeenMessage = messages.filter(
      (msg) => !msg.isSeen && msg.sender !== user?._id
    );

    if (unSeenMessage.length > 0) {
      const lastMessage = getLastMessage();
      if (lastMessage) {
        const seenData = {
          messageIds: unSeenMessage.map((msg) => msg._id),
          conversationId: lastMessage.conversationId,
          senderId: lastMessage.sender,
          recipientId: user._id
        };

        socket.emit(CHAT_EVENTS.MARK_MESSAGES_AS_SEEN, seenData);
      }
    }
  }, [messages, socket, user, getLastMessage]);

  const tryEmitUnReadMessageCount = useCallback(() => {
    if (!socket || !user) return;

    const lastMessage = getLastMessage();
    if (lastMessage && !lastMessage.isSeen)
      socket.emit(CHAT_EVENTS.UPDATE_UNREAD_COUNT, {
        conversationId: lastMessage.conversationId,
        recipientId: user._id
      });
  }, [socket, user, getLastMessage]);

  useEffect(() => {
    if (!socket) return;

    const onMessageSent = (message: Message) => {
      handleMessageSent(message);
    };

    const onNewMessage = (message: Message) => {
      handleNewMesage(message);
    };

    const onMessagesSeenConfirm = (data: MessagesSeenConfirmData) => {
      updateMessages(data.messageIds, true);
    };

    const onReadCountUpdated = (data: UnReadCountUpdatedData) => {
      handleUpdateUnreadCount(data);
    };

    socket.on(CHAT_EVENTS.NEW_MESSAGE, onNewMessage);
    socket.on(CHAT_EVENTS.MESSAGE_SENT, onMessageSent);

    socket.on(CHAT_EVENTS.UNREAD_COUNT_UPDATED, onReadCountUpdated);
    socket.on(CHAT_EVENTS.UPDATE_UNREAD_COUNT, onReadCountUpdated);
    socket.on(CHAT_EVENTS.MESSAGE_SEEN_CONFIRM, onMessagesSeenConfirm);

    return () => {
      if (socket) {
        socket.off(CHAT_EVENTS.NEW_MESSAGE, onNewMessage);
        socket.off(CHAT_EVENTS.MESSAGE_SENT, onMessageSent);

        socket.off(CHAT_EVENTS.UNREAD_COUNT_UPDATED, onReadCountUpdated);
        socket.off(CHAT_EVENTS.MESSAGE_SEEN_CONFIRM, onMessagesSeenConfirm);
        socket.off(CHAT_EVENTS.UPDATE_UNREAD_COUNT, onReadCountUpdated);
      }
    };
  }, [
    socket,
    handleMessageSent,
    handleNewMesage,
    handleUpdateUnreadCount,
    updateMessages
  ]);

  return { tryEmitSeenMessage, tryEmitUnReadMessageCount };
}

export default useChatEvents;
