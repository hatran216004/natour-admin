import { useEffect, useRef, useState } from 'react';
import { Message } from '../../../types/messages.type';
import { useAuthStore } from '../../../store/auth.store';

function useAutoScrollToBottom<T extends HTMLElement = HTMLDivElement>(
  messages: Message[],
  threshold: number = 100
) {
  const { user } = useAuthStore();

  const hasInitialScrolled = useRef<boolean>(false);
  const scrollRef = useRef<T>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollTimeoutRef = useRef<number>(null);

  function isNearBottom() {
    if (!scrollRef.current) return false;

    const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
    return scrollHeight - scrollTop - clientHeight < threshold;
  }

  function scrollToBottom(smooth: boolean = true) {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: smooth ? 'smooth' : 'instant'
    });
  }

  function handleScroll(callback: () => void) {
    setIsUserScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Sau 1 giây không scroll thì coi như user đã dừng scroll
    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
      if (isNearBottom()) callback();
    }, 1000);
  }

  // Nếu user không đang scroll và đang ở gần cuối
  useEffect(() => {
    if (!messages.length) return;

    if (
      !isUserScrolling &&
      isNearBottom() &&
      messages[messages.length - 1].sender === user?._id
    ) {
      console.log('scroll');
      scrollToBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, isUserScrolling]);

  // Scroll khi vừa mở conversation
  useEffect(() => {
    if (messages.length > 0 && !hasInitialScrolled.current) {
      scrollToBottom(false);
      hasInitialScrolled.current = true;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length > 0]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    scrollRef,
    isNearBottom,
    scrollToBottom,
    handleScroll
  };
}

export default useAutoScrollToBottom;
