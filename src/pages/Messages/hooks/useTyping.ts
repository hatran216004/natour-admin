import { useEffect, useRef, useState } from 'react';
import { useSocket } from '../../../context/SocketContext';
import { useSelectedConversation } from '../../../store/messages.store';
import { useAuthStore } from '../../../store/auth.store';

// const TYPING_TIMEOUT = 3000;

type TypingType = {
  conversationId: string;
  recipientId: string | null;
  senderId: string | null;
};

function useTyping(typingTimeout = 3000) {
  const { socket } = useSocket();
  const { selectedConversation } = useSelectedConversation();
  const { user } = useAuthStore();
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!socket || !selectedConversation._id || !user?._id) return;

    function handleTyping(data: TypingType) {
      if (
        data.conversationId === selectedConversation._id &&
        data.senderId !== user?._id
      )
        setIsTyping(true);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(handleStopTyping, typingTimeout);
    }

    function handleStopTyping() {
      typingTimeoutRef.current = null;
      setIsTyping(false);
    }

    socket.on('userTyping', handleTyping);
    socket.on('userStopTyping', handleStopTyping);

    return () => {
      socket.off('userTyping', handleTyping);
      socket.off('userStopTyping', handleStopTyping);

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [socket, selectedConversation._id, user?._id, typingTimeout]);

  return { isTyping, setIsTyping };
}

export default useTyping;
