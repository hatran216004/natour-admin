import { useEffect, useRef, useState } from 'react';
import { Message } from '../../../types/messages.type';

function useAutoScrollToBottom<T extends HTMLElement = HTMLDivElement>(
  messages: Message[],
  threshold: number = 50
) {
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

  function handleScroll() {
    setIsUserScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Sau 1 giây không scroll thì coi như user đã dừng scroll
    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, 1000);
  }

  useEffect(() => {
    if (!messages.length) return;

    // Nếu user không đang scroll và đang ở gần cuối
    if (!isUserScrolling && isNearBottom()) {
      scrollToBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, isUserScrolling]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom(false);
    }
  }, [messages]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return { scrollRef, isNearBottom, scrollToBottom, handleScroll };
}

export default useAutoScrollToBottom;
