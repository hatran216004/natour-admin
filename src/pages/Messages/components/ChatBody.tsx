import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../store/auth.store';
import { useSelectedConversation } from '../../../store/messages.store';
import useMessages from '../hooks/useMessages';
import Loading from '../../../components/Loading';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import EmptyChatMessages from './EmptyChatMessages';
import { useSocket } from '../../../context/SocketContext';
import TypingIndicator from './TypingIndicator';
import { Message } from '../../../types/messages.type';
import useScrollEndMessage from '../hooks/useScrollEndMessage';
import useTyping from '../hooks/useTyping';

// 1. LỖI GIẬT CHAT ĐỐI VỚI FAKE CONVERSATION: OK
// 2. TIN NHẮN VỪA NHẮN BỊ DELAY HIỂN THỊ KHI CHUYỂN GIỮA CÁC CONVERSATION
// 3. TIẾP TUC SEEN/UNSEEN MESSAGE
// 4. HIỂN THỊ CONVERSATIN Ở PHÍA NGƯỜI NHẬN KHI NGƯỜI GỬI BẮT ĐẦU CUỘC TRÒ CHUYỆN

export default function ChatBody() {
  const [messages, setMessages] = useState<Message[]>([]);

  const { socket } = useSocket();
  const { messagesEndRef, scrollToBottom } = useScrollEndMessage();
  const { messages: messagesApi, isLoading } = useMessages();
  const { selectedConversation } = useSelectedConversation();
  const { isTyping, setIsTyping } = useTyping();
  const { user } = useAuthStore();

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (messagesApi) {
      setMessages(messagesApi);
      setIsTyping(false);
    }
  }, [messagesApi, selectedConversation._id, setIsTyping]);

  useEffect(() => {
    if (!socket) return;

    function handleNewMessage(message: Message) {
      const { _id, conversationId, sender } = message;
      if (message.conversationId === selectedConversation._id) {
        socket?.emit('seenMeessage', {
          _id,
          conversationId,
          senderId: sender
        });
        setMessages((pre) => [...pre, message]);
      }
    }

    function handleMessageSeen(message: Message) {
      setMessages((pre) => {
        const cloneMessages = [...pre];
        cloneMessages[pre.length - 1].isSeen = message.isSeen;
        return cloneMessages;
      });
    }

    socket.on('newMessage', handleNewMessage);
    socket.on('messageSeen', handleMessageSeen);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('messageSeen', handleMessageSeen);
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
      <div className="py-4 px-2 mx-2 h-[432px] max-h-full overflow-y-auto space-y-4 relative">
        {isLoading && !messages.length && <Loading />}
        {selectedConversation.mock && (
          <EmptyChatMessages>
            No messages yet. Start the conversation
          </EmptyChatMessages>
        )}

        {!selectedConversation.mock &&
          messages.length > 0 &&
          messages.map((message, index) => {
            const isMine = message.sender === user?._id;
            const isSeen = index === messages.length - 1 && message.isSeen;
            const isLastMessage =
              messages.length - 1 === messages.indexOf(message);

            return (
              <div
                key={message._id}
                ref={isLastMessage ? messagesEndRef : null}
              >
                <ChatBubble
                  isSeen={isSeen}
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
