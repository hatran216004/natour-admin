import { useEffect, useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { IoImagesOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';

import useSendMessage from '../hooks/useSendMessage';
import {
  useConversationsStore,
  useSelectedConversation
} from '../../../store/messages.store';
import { useSocket } from '../../../context/SocketContext';
import { useAuthStore } from '../../../store/auth.store';
import useDebounce from '../../../hooks/useDebounce';
import { useQueryClient } from '@tanstack/react-query';
import { Message } from '../../../types/messages.type';

export default function ChatInput({
  disabled,
  handleUpdateMessages,
  scrollToBottom,
  isNearBottom
}: {
  disabled?: boolean;
  handleUpdateMessages: (message: Message) => void;
  scrollToBottom: (smooth?: boolean) => void;
  isNearBottom: () => boolean;
}) {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');
  const { socket } = useSocket();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAuthStore();
  const debounceValue = useDebounce(message, 800);

  const { sendMessage, isPending } = useSendMessage();
  const { selectedConversation, setSelectedConversation } =
    useSelectedConversation();
  const { conversations, setConversations } = useConversationsStore();

  useEffect(() => {
    if (!isPending) inputRef.current?.focus();
  }, [isPending]);

  useEffect(() => {
    if (!selectedConversation || !socket || !user?._id) return;

    const typingData = {
      conversationId: selectedConversation._id,
      senderId: user?._id,
      recipientId: selectedConversation.userId
    };
    if (debounceValue) {
      socket?.emit('typing', typingData);
    }
  }, [debounceValue, selectedConversation, socket, user?._id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }

  function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message) return;

    sendMessage(
      {
        recipientId: selectedConversation.userId,
        message: Array.from(message.trim()).slice(0, 1000).join('')
      },
      {
        onSuccess: (data) => {
          const { newMessage } = data.data.data;
          const { text, sender, conversationId, updatedAt } = newMessage;

          const newConversations = conversations.map((conv) =>
            conv._id === selectedConversation._id
              ? {
                  ...conv,
                  _id: conversationId,
                  lastMessage: { text, sender },
                  mock: false,
                  updatedAt
                }
              : conv
          );
          setConversations(newConversations);
          handleUpdateMessages(newMessage);

          if (selectedConversation.mock) {
            const newSelecteConversation = {
              ...selectedConversation,
              _id: conversationId,
              mock: false
            };
            setSelectedConversation(newSelecteConversation);
            queryClient.invalidateQueries({
              queryKey: ['conversations']
            });
          }

          if (selectedConversation.userId !== user?._id && !isNearBottom()) {
            scrollToBottom(false);
          }

          if (!socket) return;

          // Emit event
          socket.emit('stopTyping', {
            recipientId: selectedConversation.userId
          });
          socket.emit('sendMessage', newMessage);
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
      <div className="flex items-center gap-3">
        <input type="file" id="file" hidden />
        <label htmlFor="file" className="cursor-pointer">
          <IoImagesOutline size={24} />
        </label>
        <input
          ref={inputRef}
          disabled={isPending}
          onChange={handleChange}
          value={message}
          className="placeholder:italic block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none"
          placeholder="Write your thoughts here..."
        />
        <button type="submit" disabled={disabled || isPending}>
          <IoMdSend size={24} className="fill-primary" />
        </button>
      </div>
    </form>
  );
}
