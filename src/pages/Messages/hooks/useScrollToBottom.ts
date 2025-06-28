import { useCallback, useEffect, useRef, useState } from 'react';
import { useMessages } from '../../../store/messages.store';
import { useAuthStore } from '../../../store/auth.store';

function useScrollToBottom<T extends HTMLElement = HTMLDivElement>() {
  const { user } = useAuthStore();
  const chatPanelRef = useRef<T>(null);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const { messages } = useMessages();
  const prevMessagesLength = useRef(messages.length);

  const isNearBottom = useCallback((threshold: number = 100) => {
    if (!chatPanelRef.current) return false;

    const { scrollTop, clientHeight, scrollHeight } = chatPanelRef.current;
    return scrollHeight - scrollTop - clientHeight < threshold;
  }, []);

  const scrollToBottom = (smooth: boolean = true) => {
    if (!chatPanelRef.current) return;

    chatPanelRef.current.scrollTo({
      top: chatPanelRef.current.scrollHeight,
      behavior: smooth ? 'smooth' : 'instant'
    });
  };

  const scrollToNewMessages = (smooth: boolean = true) => {
    scrollToBottom(smooth);
    setNewMessageCount(0);
  };

  useEffect(() => {
    if (isNearBottom()) {
      setNewMessageCount(0);
    }
  }, [isNearBottom]);

  useEffect(() => {
    const currentLength = messages.length;
    const preLength = prevMessagesLength.current;

    if (preLength > 0 && currentLength > preLength) {
      const newMessages = messages.slice(preLength);

      if (!isNearBottom()) {
        const isNotMyMessage = newMessages[0].sender !== user?._id;
        if (isNotMyMessage)
          setNewMessageCount((pre) => pre + newMessages.length);
      } else {
        scrollToBottom();
        setNewMessageCount(0);
      }
    }

    prevMessagesLength.current = currentLength;
  }, [messages, user?._id, isNearBottom]);

  return {
    chatPanelRef,
    newMessageCount,
    hasNewMessages: newMessageCount > 0,
    isNearBottom,
    scrollToBottom,
    scrollToNewMessages
  };
}

export default useScrollToBottom;
