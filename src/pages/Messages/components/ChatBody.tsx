import { useEffect } from 'react';

import { useAuthStore } from '../../../store/auth.store';
import {
  useConversationsStore,
  useSelectedConversation
} from '../../../store/messages.store';
import { useSocket } from '../../../context/SocketContext';
import useMessages from '../hooks/useMessages';

import TypingIndicator from './TypingIndicator';
import Loading from '../../../components/Loading';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import EmptyChatMessages from './EmptyChatMessages';
import { Message } from '../../../types/messages.type';
import useTyping from '../hooks/useTyping';
import useAutoScrollToBottom from '../hooks/useAutoScrollToBottom';

// 1. GIẬT SCOLL NHẸ KHI CHAT Ở PHÍA NGƯỜI GỬI ĐƯỢC SEEN
// 2. HIỂN THỊ CONVERSATIN Ở PHÍA NGƯỜI NHẬN KHI NGƯỜI GỬI BẮT ĐẦU CUỘC TRÒ CHUYỆN

export default function ChatBody() {
  const { socket } = useSocket();
  const { isTyping } = useTyping();
  const { messages, isLoading, handleUpdateMessages } = useMessages();
  const { selectedConversation } = useSelectedConversation();
  const { conversations, setConversations } = useConversationsStore();
  const { user } = useAuthStore();
  const { scrollRef, handleScroll, scrollToBottom, isNearBottom } =
    useAutoScrollToBottom(messages);

  function hasUnseenMessage() {
    return messages.find((msg) => !msg.isSeen);
  }

  function tryEmitSeenMessage() {
    const unSeenMessage = hasUnseenMessage();

    if (
      unSeenMessage &&
      messages[messages.length - 1].sender === selectedConversation.userId
    ) {
      socket?.emit('seenMeessage', {
        _id: unSeenMessage?._id,
        conversationId: unSeenMessage?.conversationId,
        senderId: unSeenMessage?.sender
      });
    }
  }

  useEffect(() => {
    if (isTyping && isNearBottom()) scrollToBottom();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTyping]);

  useEffect(() => {
    if (messages.length > 0 && isNearBottom()) {
      tryEmitSeenMessage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    function handleNewMessage(message: Message) {
      const { _id, conversationId, sender } = message;
      if (message.conversationId === selectedConversation._id) {
        handleUpdateMessages(message);
        setConversations(
          conversations.map((ele) => {
            return ele._id === conversationId
              ? {
                  ...ele,
                  lastMessage: { sender, text: message.text }
                }
              : ele;
          })
        );

        if (isNearBottom()) {
          socket?.emit('seenMeessage', {
            _id,
            conversationId,
            senderId: sender
          });
        }
      }
    }

    function handleMessageSeen(message: Message) {
      handleUpdateMessages(message, true);
    }

    socket.on('newMessage', handleNewMessage);
    socket.on('messageSeen', handleMessageSeen);
    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('messageSeen', handleMessageSeen);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    socket,
    selectedConversation._id,
    conversations,
    setConversations,
    handleUpdateMessages
  ]);

  if (!selectedConversation.userId) {
    return (
      <EmptyChatMessages>
        Empty conversations. Start a new conversation
      </EmptyChatMessages>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div
        className="py-4 px-2 mx-2 h-[432px] max-h-full overflow-y-auto space-y-2 relative"
        ref={scrollRef}
        onScroll={() => handleScroll(tryEmitSeenMessage)}
      >
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
              const isLastMsg = index === messages.length - 1;
              const isSeen = isLastMsg && message.isSeen;
              return (
                <ChatBubble
                  isLastMsg={isLastMsg}
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

      <ChatInput
        disabled={isLoading}
        handleUpdateMessages={handleUpdateMessages}
        scrollToBottom={scrollToBottom}
        isNearBottom={isNearBottom}
      />
    </div>
  );
}

/*
  | Trạng thái                    | Hành động                           |
  | ----------------------------- | ----------------------------------- |
  | Vào conversation mới          | Kiểm tra tin nhắn chưa xem → emit   |
  | Có tin nhắn mới từ người khác | Nếu đang ở đúng conversation → emit |
  | User scroll tới cuối tin nhắn | Nếu có tin nhắn chưa xem → emit     |

  IntersectionObserver: Nó giúp bạn biết khi nào một phần tử đi vào (hoặc ra khỏi) màn hình
*/
