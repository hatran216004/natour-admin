import { useRef } from 'react';

function useScrollEndMessage() {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView();
  }

  return { messagesEndRef, scrollToBottom };
}

export default useScrollEndMessage;
