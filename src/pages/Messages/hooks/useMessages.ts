import { useQuery } from '@tanstack/react-query';
import { conversationsApi } from '../../../services/conversation.api';
import { useSelectedConversation } from '../../../store/messages.store';
import { useEffect, useState } from 'react';
import { Message } from '../../../types/messages.type';
import useScrollEndMessage from './useScrollEndMessage';

function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { messagesEndRef, scrollToBottom } = useScrollEndMessage();
  const {
    selectedConversation: { userId, mock, _id }
  } = useSelectedConversation();

  const { data, isLoading } = useQuery({
    queryKey: ['messages-conversation', userId],
    queryFn: () => conversationsApi.getAllMessages(userId),
    enabled: !mock && !!_id,
    gcTime: 1000
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    const messagesApi = data?.data.data.messages;
    if (!isLoading && messagesApi) {
      setMessages(messagesApi);
    }
  }, [isLoading, data, _id]);

  return { messages, isLoading, messagesEndRef, setMessages };
}

export default useMessages;
