import { useEffect, useRef, useState } from 'react';
import { Message } from '../../../types/messages.type';
import { useAuthStore } from '../../../store/auth.store';
import { useSelectedConversation } from '../../../store/messages.store';

function useAutoScrollToBottom<T extends HTMLElement = HTMLDivElement>(
  messages: Message[],
  threshold: number = 100
) {
  const { selectedConversation } = useSelectedConversation();
  const { user } = useAuthStore();

  const scrollRef = useRef<T>(null);
  const scrollRefPanel = useRef<T>(null);
  const scrollTimeoutRef = useRef<number>(null);

  const hasInitialScrolled = useRef<boolean>(false);
  const previousConversationId = useRef<string>(selectedConversation._id);

  const [isUserScrolling, setIsUserScrolling] = useState(false);

  function isNearBottom() {
    if (!scrollRefPanel.current) return false;

    const { scrollTop, clientHeight, scrollHeight } = scrollRefPanel.current;
    return scrollHeight - scrollTop - clientHeight < threshold;
  }

  function scrollToBottom(smooth: boolean = true) {
    if (!scrollRef.current) return;

    scrollRef.current.scrollIntoView({
      behavior: smooth ? 'smooth' : 'instant'
    });
  }

  // Chạy vào 16 lần khi có tin nhắn mới (cần fix)
  function handleScroll(callback: () => void) {
    setIsUserScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    if (isNearBottom()) callback();

    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, 1000);
  }

  useEffect(() => {
    const conversationChanged =
      previousConversationId.current !== selectedConversation._id;

    if (conversationChanged && messages.length > 0) {
      scrollToBottom(false);
      previousConversationId.current = selectedConversation._id;
    }
  }, [messages, selectedConversation._id]);

  useEffect(() => {
    if (!messages.length) return;

    if (!isUserScrolling && isNearBottom()) {
      scrollToBottom();
      return;
    }

    const lastMsg = messages[messages.length - 1];
    const hasNewMsg =
      (Date.now() - new Date(lastMsg.createdAt).getTime()) / 1000 < 1;

    if (hasNewMsg && lastMsg.sender === user?._id && !isUserScrolling) {
      scrollToBottom(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, isUserScrolling]);

  useEffect(() => {
    if (messages.length > 0 && !hasInitialScrolled.current) {
      scrollToBottom(false);
      hasInitialScrolled.current = true;
    }
  }, [messages]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    scrollRef,
    scrollRefPanel,
    previousConversationId,
    isNearBottom,
    scrollToBottom,
    handleScroll
  };
}

export default useAutoScrollToBottom;
