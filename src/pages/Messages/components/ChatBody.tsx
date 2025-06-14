import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../../../store/auth.store';
import { useSelectedConversation } from '../../../store/messages.store';
import useMessages from '../hooks/useMessages';
import Skeleton from '../../../components/Skeleton';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import EmptyChatMessages from './EmptyChatMessages';
import { useSocket } from '../../../context/SocketContext';
import TypingIndicator from './TypingIndicator';
import { Message } from '../../../types/messages.type';
import useScrollEndMessage from '../hooks/useScrollEndMessage';

type TypingType = {
  conversationId: string;
  recipientId: string | null;
  senderId: string | null;
};

export default function ChatBody() {
  const { messagesEndRef, scrollToBottom } = useScrollEndMessage();
  const [messages, setMessages] = useState<Message[]>([]);
  const { socket } = useSocket();
  const { messages: messagesApi, isLoading } = useMessages();
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<number | null>(null);

  const { selectedConversation } = useSelectedConversation();
  const { user } = useAuthStore();

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (messagesApi) {
      setMessages(messagesApi);
      setIsTyping(false);
    }
  }, [messagesApi, selectedConversation._id]);

  useEffect(() => {
    if (!socket) return;

    function handleNewMessage(message: Message) {
      setMessages((pre) => [...pre, message]);
    }

    function handleTyping(data: TypingType) {
      if (
        data.conversationId === selectedConversation._id &&
        data.senderId !== user?._id
      )
        setIsTyping(true);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        typingTimeoutRef.current = null;
      }, 3000);
    }

    socket.on('newMessage', handleNewMessage);
    socket.on('userTyping', handleTyping);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('userTyping', handleTyping);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [socket, selectedConversation._id, user?._id]);

  if (!selectedConversation.userId) {
    return (
      <EmptyChatMessages>
        Empty conversations. Start a new conversation
      </EmptyChatMessages>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="py-4 px-2 mx-2 h-[432px] max-h-full overflow-y-auto space-y-4">
        {isLoading && <Skeleton />}

        {selectedConversation.mock && (
          <EmptyChatMessages>
            No messages yet. Start the conversation
          </EmptyChatMessages>
        )}

        {!selectedConversation.mock &&
          messages.length > 0 &&
          messages.map((message) => {
            const isMine = message.sender === user?._id;
            const isLastMessage =
              messages.length - 1 === messages.indexOf(message);
            return (
              <div
                key={message._id}
                ref={isLastMessage ? messagesEndRef : null}
              >
                <ChatBubble
                  photo={selectedConversation.photo}
                  username={selectedConversation.username}
                  isMine={isMine}
                >
                  {message.text}
                </ChatBubble>
              </div>
            );
          })}

        {isTyping && (
          <ChatBubble
            photo={selectedConversation.photo}
            username={selectedConversation.username}
          >
            <TypingIndicator />
          </ChatBubble>
        )}
      </div>
      <ChatInput disabled={isLoading} setMessages={setMessages} />
    </div>
  );
}
