import { useEffect } from 'react';
import _ from 'lodash';

import { useAuthStore } from '../../../store/auth.store';
import { useSelectedConversation } from '../../../store/messages.store';
import { useSocket } from '../../../context/SocketContext';
import useMessages from '../hooks/useMessages';

import TypingIndicator from './TypingIndicator';
import Loading from '../../../components/Loading';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import EmptyChatMessages from './EmptyChatMessages';
import { Message } from '../../../types/messages.type';
import useTyping from '../hooks/useTyping';

// 1. LỖI GIẬT CHAT ĐỐI VỚI FAKE CONVERSATION: OK
// 2. TIN NHẮN VỪA NHẮN BỊ DELAY HIỂN THỊ KHI CHUYỂN GIỮA CÁC CONVERSATION: OK
// 3. TIẾP TUC SEEN/UNSEEN MESSAGE
// 4. HIỂN THỊ CONVERSATIN Ở PHÍA NGƯỜI NHẬN KHI NGƯỜI GỬI BẮT ĐẦU CUỘC TRÒ CHUYỆN

export default function ChatBody() {
  const { socket } = useSocket();
  const { isTyping } = useTyping();
  const { messages, isLoading, messagesEndRef, setMessages } = useMessages();
  const { selectedConversation } = useSelectedConversation();
  const { user } = useAuthStore();

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
        const cloneMessages = _.cloneDeep(pre);
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
  }, [socket, selectedConversation._id, setMessages]);

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

        {!selectedConversation.mock && messages.length > 0 && (
          <>
            {messages.map((message, index) => {
              const isMine = message.sender === user?._id;
              const isSeen = index === messages.length - 1 && message.isSeen;
              return (
                <ChatBubble
                  key={message._id}
                  isSeen={isSeen}
                  photo={selectedConversation.photo}
                  username={selectedConversation.username}
                  isMine={isMine}
                >
                  {message.text}
                </ChatBubble>
              );
            })}
            <span ref={messagesEndRef}></span>
          </>
        )}

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
