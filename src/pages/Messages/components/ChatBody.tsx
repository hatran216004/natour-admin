import { useEffect, useRef } from 'react';
import { useAuthStore } from '../../../store/auth.store';
import { useSelectedConversation } from '../../../store/messages.store';
import useMessages from '../hooks/useMessages';
import Skeleton from '../../../components/Skeleton/Skeleton';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import EmptyChatMessages from './EmptyChatMessages';

export default function ChatBody() {
  const { selectedConversation } = useSelectedConversation();
  const { messages, isLoading } = useMessages();
  const { user } = useAuthStore();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView();
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!selectedConversation.userId) {
    return (
      <EmptyChatMessages>
        Empty conversations. Start a new conversation
      </EmptyChatMessages>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="py-4 px-2 mx-2 h-[432px] overflow-y-auto space-y-2">
        {isLoading && (
          <>
            <Skeleton size="sm" />
            <Skeleton size="sm" side="right" />
          </>
        )}
        {selectedConversation.mock && (
          <EmptyChatMessages>
            No messages yet. Start the conversation!
          </EmptyChatMessages>
        )}
        {!isLoading &&
          messages?.map((message) => {
            const isMine = message.sender === user?._id;
            return (
              <ChatBubble
                key={message._id}
                message={message.text}
                photo={selectedConversation.photo}
                username={selectedConversation.username}
                isMine={isMine}
              />
            );
          })}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput disabled={isLoading} />
    </div>
  );
}
