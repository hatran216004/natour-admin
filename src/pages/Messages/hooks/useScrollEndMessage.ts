import { useRef } from 'react';

function useScrollEndMessage() {
  const messagesEndRef = useRef<null | HTMLSpanElement>(null);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView();
  }

  return { messagesEndRef, scrollToBottom };
}

export default useScrollEndMessage;
