import { useEffect, useRef } from 'react';
import Skeleton from '../../../components/Skeleton/Skeleton';
import { useAuthStore } from '../../../store/auth.store';
import { useSelectedConversation } from '../../../store/messages.store';
import useMessages from '../hooks/useMessages';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import { BsChatSquareDots } from 'react-icons/bs';

export default function ChatBody() {
  const { selectedConversation } = useSelectedConversation();
  const { messages, isLoading } = useMessages(selectedConversation.userId);
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
      <div className="h-full flex items-center justify-center">
        <div>
          <BsChatSquareDots size={220} className="mx-auto" />
          <p className="text-center mt-2 font-medium">
            Choose a user to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="py-4 px-2 mx-2 flex-1 max-h-[412px] overflow-y-auto space-y-2">
        {isLoading && (
          <div className="">
            <Skeleton size="md" />
          </div>
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
