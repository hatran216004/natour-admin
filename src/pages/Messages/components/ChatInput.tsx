import { useEffect, useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { IoImagesOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import useSendMessage from '../hooks/useSendMessage';
import {
  useConversationsStore,
  useSelectedConversation
} from '../../../store/messages.store';

export default function ChatInput({ disabled }: { disabled?: boolean }) {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const queryClient = useQueryClient();

  const { sendMessage, isPending } = useSendMessage();
  const { selectedConversation, setSelectedConversation } =
    useSelectedConversation();
  const { conversations, setConversations } = useConversationsStore();

  useEffect(() => {
    if (!isPending) inputRef.current?.focus();
  }, [isPending]);

  function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message) return;

    sendMessage(
      {
        recipientId: selectedConversation.userId,
        message: message.trim().slice(0, 1000)
      },
      {
        onSuccess: (data) => {
          const { newMessage } = data.data.data;
          const text = newMessage.text;
          const sender = newMessage.sender;
          const conversationId = newMessage.conservationId;

          const newConversations = conversations.map((conv) =>
            conv._id === selectedConversation._id
              ? {
                  ...conv,
                  _id: conversationId,
                  lastMessage: { text, sender },
                  mock: false
                }
              : conv
          );
          const newSelecteConversation = {
            ...selectedConversation,
            _id: conversationId,
            mock: false
          };

          setConversations(newConversations);
          setSelectedConversation(newSelecteConversation);

          queryClient.invalidateQueries({
            queryKey: ['messages-conversation']
          });
        },
        onError: () => {
          toast.error('Error sending message, please try again later');
        },
        onSettled: () => setMessage('')
      }
    );
  }

  return (
    <form onSubmit={handleSendMessage} className="px-4 mt-auto">
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your message
      </label>
      <div className="flex items-center gap-3">
        <input type="file" id="file" hidden />
        <label htmlFor="file" className="cursor-pointer">
          <IoImagesOutline size={24} />
        </label>
        <input
          ref={inputRef}
          disabled={isPending}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          id="message"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none"
          placeholder="Write your thoughts here..."
        />
        <button type="submit" disabled={disabled || isPending}>
          <IoMdSend size={24} className="fill-primary" />
        </button>
      </div>
    </form>
  );
}
