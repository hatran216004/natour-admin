import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../../../store/auth.store';
import { useSelectedConversation } from '../../../store/messages.store';
import useMessages from '../hooks/useMessages';
import Skeleton from '../../../components/Skeleton';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import EmptyChatMessages from './EmptyChatMessages';
import { useSocket } from '../../../context/SocketContext';
import { Message } from '../../../types/messages.type';
import TypingIndicator from './TypingIndicator';

type TypingType = {
  conversationId: string;
  recipientId: string | null;
  senderId: string | null;
};

export default function ChatBody() {
  const { socket, onlineUsers } = useSocket();
  const { messages: messagesApi, isLoading } = useMessages();
  const [messages, setMessages] = useState<Message[]>([]);
  const [dataTyping, setDataTyping] = useState<TypingType | null>(null);

  const { selectedConversation } = useSelectedConversation();
  const { user } = useAuthStore();

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView();
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages, dataTyping]);

  useEffect(() => {
    if (messagesApi) {
      setMessages(messagesApi);
      setDataTyping(null);
    }
  }, [messagesApi]);

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
        setDataTyping(data);
    }

    function handleStopTyping() {
      setDataTyping(null);
    }

    socket.on('newMessage', handleNewMessage);
    socket.on('userTyping', handleTyping);
    socket.on('userStopTyping', handleStopTyping);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('userTyping', handleTyping);
      socket.off('userStopTyping', handleStopTyping);
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
            if (message.conversationId !== selectedConversation._id)
              return null;
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

        {dataTyping &&
          dataTyping?.conversationId === selectedConversation._id &&
          onlineUsers.includes(dataTyping.senderId!) && (
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
