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
import { Conversation } from '../../../types/conversations.type';
import { IoArrowDown } from 'react-icons/io5';
import { useQueryClient } from '@tanstack/react-query';

export default function ChatBody() {
  const queryClient = useQueryClient();
  const { socket } = useSocket();
  const { isTyping } = useTyping();
  const { messages, isLoading, handleUpdateMessages } = useMessages();
  const { selectedConversation } = useSelectedConversation();
  const { conversations, setConversations } = useConversationsStore();
  const { user } = useAuthStore();
  const {
    scrollRef,
    scrollRefPanel,
    previousConversationId,
    handleScroll,
    scrollToBottom,
    isNearBottom
  } = useAutoScrollToBottom(messages);

  function tryEmitSeenMessage() {
    const unSeenMessage = messages.filter(
      (msg) => !msg.isSeen && msg.sender !== user?._id
    );

    if (unSeenMessage.length > 0) {
      const seenData = unSeenMessage.map((msg) => ({
        _id: msg?._id,
        conversationId: msg?.conversationId,
        senderId: msg?.sender,
        recipientId: user?._id
      }));
      socket?.emit('seenMeessage', seenData);
    }
  }

  function handleStartNewConversation(conversationId: string) {
    const existingConversation = conversations.find(
      (conv) => conv._id === conversationId
    );
    if (!existingConversation) {
      queryClient.invalidateQueries({
        queryKey: ['conversations']
      });
    }
  }

  useEffect(() => {
    if (isTyping && isNearBottom()) scrollToBottom();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTyping]);

  useEffect(() => {
    const conversationChanged =
      previousConversationId.current !== selectedConversation._id;
    if (messages.length > 0 && isNearBottom() && !conversationChanged) {
      tryEmitSeenMessage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    function handleNewMessage(message: Message) {
      const { _id, conversationId, sender } = message;

      handleStartNewConversation(conversationId);

      if (message.conversationId === selectedConversation._id) {
        handleUpdateMessages(message);

        if (isNearBottom() && sender !== user?._id) {
          socket?.emit('seenMeessage', [
            {
              _id,
              conversationId,
              senderId: sender,
              recipientId: user?._id
            }
          ]);
        } else {
          socket?.emit('updateUnreadConversation', {
            conversationId,
            recipientId: user?._id
          });
        }
      } else {
        socket?.emit('updateUnreadConversation', {
          conversationId,
          recipientId: user?._id
        });
      }

      setConversations(
        conversations.map((conv) =>
          conv._id === conversationId
            ? {
                ...conv,
                lastMessage: { sender, text: message.text }
              }
            : conv
        )
      );
    }

    function handleMessageSeen(messages: Message[]) {
      handleUpdateMessages(messages, true);
    }

    function handleUpdateUnreadCount(conversation: Conversation) {
      setConversations(
        conversations.map((conv) =>
          conv._id === conversation._id
            ? { ...conv, unreadCount: conversation.unreadCount }
            : conv
        )
      );
    }

    socket.on('newMessage', handleNewMessage);
    socket.on('messageSeen', handleMessageSeen);
    socket.on('updatedUnreadConversation', handleUpdateUnreadCount);
    socket.on('removeUnreadCount', handleUpdateUnreadCount);
    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('messageSeen', handleMessageSeen);
      socket.off('updatedUnreadConversation', handleUpdateUnreadCount);
      socket.off('removeUnreadCount', handleUpdateUnreadCount);
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
    <div className="flex flex-col flex-1 relative">
      {!isNearBottom(300) && messages.length > 0 && (
        <button
          onClick={() => scrollToBottom(false)}
          className="animate-bounce z-10 border-gray-300 w-11 h-11 flex items-center justify-center cursor-pointer text-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white absolute rounded-[50%] shadow-custom"
        >
          <IoArrowDown size={24} />
        </button>
      )}
      <div
        className="py-4 px-2 mx-2 h-[432px] max-h-full overflow-y-auto space-y-1 relative"
        ref={scrollRefPanel}
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
              const seprate =
                index > 0 &&
                messages[index].sender !== messages[index - 1].sender;
              return (
                <div className={`${seprate ? 'pt-8' : ''}`} key={message._id}>
                  <ChatBubble
                    isLastMsg={isLastMsg}
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
          </>
        )}

        {isTyping && (
          <ChatBubble
            isTyping={isTyping}
            photo={selectedConversation.photo}
            username={selectedConversation.username}
          >
            <TypingIndicator />
          </ChatBubble>
        )}
        <span ref={scrollRef}></span>
      </div>

      <ChatInput
        disabled={isLoading}
        handleUpdateMessages={handleUpdateMessages}
      />
    </div>
  );
}
