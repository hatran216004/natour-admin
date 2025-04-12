import { useEffect, useRef } from 'react';

function useOutsideClick(hanlder: () => void, listenCapturing = true) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        hanlder();
      }
    }
    document.addEventListener('click', handleClick, listenCapturing);
    return () =>
      document.removeEventListener('click', handleClick, listenCapturing);
  }, [hanlder, listenCapturing]);

  return ref;
}

export default useOutsideClick;
