import { useCallback, useEffect, useRef, useState } from 'react';
import { useMessages } from '../../../store/messages.store';
import { useAuthStore } from '../../../store/auth.store';

function useScrollToBottom<T extends HTMLElement = HTMLDivElement>() {
  const { user } = useAuthStore();
  const chatPanelRef = useRef<T>(null);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const { messages } = useMessages();

  const isNearBottom = useCallback((threshold: number = 100) => {
    if (!chatPanelRef.current) return false;

    const { scrollTop, clientHeight, scrollHeight } = chatPanelRef.current;
    return scrollHeight - scrollTop - clientHeight < threshold;
  }, []);

  const scrollToBottom = useCallback((smooth: boolean = true) => {
    if (!chatPanelRef.current) return;

    chatPanelRef.current.scrollTo({
      top: chatPanelRef.current.scrollHeight,
      behavior: smooth ? 'smooth' : 'instant'
    });
  }, []);

  const scrollToNewMessages = useCallback(
    (smooth: boolean = true) => {
      scrollToBottom(smooth);
      setNewMessageCount(0);
    },
    [scrollToBottom, setNewMessageCount]
  );

  useEffect(() => {
    if (isNearBottom()) {
      setNewMessageCount(0);
    }
  }, [isNearBottom]);

  useEffect(() => {
    if (!messages.length) return;

    const isMine = messages[messages.length - 1].sender === user?._id;
    if (isMine) {
      scrollToBottom();
      setNewMessageCount(0);
    } else {
      if (!isNearBottom()) {
        const unSeenMessages = messages.filter((m) => !m.isSeen).length;
        setNewMessageCount(unSeenMessages);
      }
    }
  }, [user?._id, messages, isNearBottom, setNewMessageCount, scrollToBottom]);

  return {
    chatPanelRef,
    newMessageCount,
    hasNewMessages: newMessageCount > 0,
    isNearBottom,
    scrollToBottom,
    scrollToNewMessages,
    setNewMessageCount
  };
}

export default useScrollToBottom;
