/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { IoImagesOutline } from 'react-icons/io5';

import { useSelectedConversation } from '../../../store/messages.store';
import { useSocket } from '../../../context/SocketContext';
import { useAuthStore } from '../../../store/auth.store';
import useDebounce from '../../../hooks/useDebounce';
import { CHAT_EVENTS } from '../../../services/socket/events';

export default function ChatInput({ disabled }: { disabled?: boolean }) {
  const [message, setMessage] = useState('');
  const { socket } = useSocket();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAuthStore();
  const debounceValue = useDebounce(message, 800);

  const { selectedConversation } = useSelectedConversation();
  const recipientId = selectedConversation.userId;

  useEffect(() => {
    if (!message) inputRef.current?.focus();
  }, [message]);

  useEffect(() => {
    if (!selectedConversation || !socket || !user?._id) return;

    if (debounceValue) {
      socket.emit(CHAT_EVENTS.START_TYPING, {
        conversationId: selectedConversation._id,
        recipientId
      });
    }
  }, [debounceValue, selectedConversation, socket, user?._id]);

  function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message) return;

    socket?.emit(CHAT_EVENTS.SEND_MESSAGE, {
      message,
      recipientId
    });
    setMessage('');
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
          disabled={disabled}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="placeholder:italic block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none"
          placeholder="Write your thoughts here..."
        />
        <button type="submit" disabled={disabled}>
          <IoMdSend size={24} className="fill-primary" />
        </button>
      </div>
    </form>
  );
}
