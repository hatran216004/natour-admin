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
import { Message } from '../../../types/messages.type';
import { useQueryClient } from '@tanstack/react-query';

export default function ChatInput({
  disabled,
  setMessages
}: {
  disabled?: boolean;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');
  const { socket } = useSocket();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAuthStore();
  const debounceValue = useDebounce(message);

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
          const { text, sender, conversationId } = newMessage;

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
          setMessages((pre) => [...pre, newMessage]);
          setConversations(newConversations);

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
          onChange={handleChange}
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
