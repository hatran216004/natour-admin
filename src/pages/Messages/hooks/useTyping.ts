import { useEffect, useRef, useState } from 'react';
import { useSocket } from '../../../context/SocketContext';
import { useSelectedConversation } from '../../../store/messages.store';
import { useAuthStore } from '../../../store/auth.store';
import { CHAT_EVENTS } from '../../../services/socket/events';
import { UserTypingData } from '../../../types/messages.type';

// const TYPING_TIMEOUT = 3000;

function useTyping(typingTimeout = 3000) {
  const { socket } = useSocket();
  const { selectedConversation } = useSelectedConversation();
  const { user } = useAuthStore();
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!socket || !selectedConversation._id || !user?._id) return;

    const onTyping = (data: UserTypingData) => {
      if (
        data.conversationId === selectedConversation._id &&
        data.userId !== user?._id
      )
        setIsTyping(data.isTyping);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(onStopTyping, typingTimeout);
    };

    const onStopTyping = () => {
      typingTimeoutRef.current = null;
      setIsTyping(false);
    };

    socket.on(CHAT_EVENTS.USER_TYPING, onTyping);

    return () => {
      socket.off(CHAT_EVENTS.USER_TYPING, onTyping);

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [socket, selectedConversation._id, user?._id, typingTimeout]);

  return { isTyping, setIsTyping };
}

export default useTyping;
