import { useEffect, useRef } from 'react';

import { useAuthStore } from '../../../store/auth.store';
import {
  useMessages,
  useSelectedConversation
} from '../../../store/messages.store';

import TypingIndicator from './TypingIndicator';
import Loading from '../../../components/Loading';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import EmptyChatMessages from './EmptyChatMessages';
import useTyping from '../hooks/useTyping';
import { useSocket } from '../../../context/SocketContext';
import { useQuery } from '@tanstack/react-query';
import { conversationsApi } from '../../../services/conversation.api';
import useChatEvents from '../../../hooks/useChatEvents';
import NewMessageIndicator from './NewMessageIndicator';
import useScrollToBottom from '../hooks/useScrollToBottom';

export default function ChatBody() {
  const { user } = useAuthStore();
  const { socket } = useSocket();

  const { tryEmitSeenMessage, tryEmitUnReadMessageCount } =
    useChatEvents(socket);
  const { isTyping } = useTyping();
  const { messages, setMessages, getLastMessage } = useMessages();
  const { selectedConversation } = useSelectedConversation();

  const isFirst = useRef(true);

  const {
    chatPanelRef,
    hasNewMessages,
    newMessageCount,
    scrollToNewMessages,
    isNearBottom,
    scrollToBottom
  } = useScrollToBottom();
  const lastMessage = getLastMessage();

  const { data, isLoading } = useQuery({
    queryKey: ['messages-conversation', selectedConversation._id],
    queryFn: () => conversationsApi.getAllMessages(selectedConversation._id),
    enabled: !selectedConversation.mock && !!selectedConversation._id
  });

  useEffect(() => {
    scrollToBottom(false);
  }, [selectedConversation._id, scrollToBottom]);

  useEffect(() => {
    if (messages.length && isFirst.current) {
      scrollToBottom(false);
      isFirst.current = false;
    }
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (data?.data.data.messages) {
      setMessages(data.data.data.messages);
    }
  }, [data, setMessages]);

  useEffect(() => {
    if (isTyping && isNearBottom()) scrollToBottom();
  }, [isTyping, isNearBottom, scrollToBottom]);

  useEffect(() => {
    if (!messages.length || !lastMessage) return;
    const isNotMyMsg = lastMessage.sender !== user?._id;
    const isSameConversation =
      lastMessage.conversationId === selectedConversation._id;

    if (isNotMyMsg) {
      if (isNearBottom() && isSameConversation) {
        tryEmitSeenMessage();
      } else {
        tryEmitUnReadMessageCount();
      }
    }
  }, [
    messages,
    lastMessage,
    user?._id,
    selectedConversation._id,
    isNearBottom,
    tryEmitSeenMessage,
    tryEmitUnReadMessageCount
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
      <NewMessageIndicator
        newMessageCount={newMessageCount}
        onScrollToBottom={() => {
          scrollToNewMessages();
          tryEmitSeenMessage();
        }}
        isVisible={!isNearBottom(200) && hasNewMessages}
      />

      <div
        className="py-4 px-2 mx-2 h-[432px] max-h-full overflow-y-auto space-y-2 relative"
        ref={chatPanelRef}
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
      </div>

      <ChatInput disabled={isLoading} />
    </div>
  );
}
