import classNames from 'classnames';
import { useEffect, useState } from 'react';

export default function ChatBubble({
  isMine,
  username,
  photo,
  children,
  isSeen,
  isLastMsg,
  isTyping
}: {
  isMine?: boolean;
  username?: string;
  photo?: string;
  isSeen?: boolean;
  children: React.ReactNode;
  isLastMsg?: boolean;
  isTyping?: boolean;
}) {
  const [showDelivered, setShowDelivered] = useState(false);

  useEffect(() => {
    let timer: number | null = null;

    if (!isSeen) {
      timer = setTimeout(() => {
        setShowDelivered(true);
      }, 300);
    } else {
      setShowDelivered(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isSeen]);

  return (
    <>
      <div
        className={classNames('flex gap-[14px]', {
          'flex-row-reverse': isMine
        })}
      >
        {!isMine && (
          <img
            className="w-8 h-8 object-cover rounded-full flex-shrink-0"
            src={`${import.meta.env.VITE_IMG_URL}/users/${photo}`}
            alt={username}
          />
        )}
        <div
          className={classNames('max-w-[50%] p-2 rounded-xl', {
            'bg-primary text-white': isMine,
            'bg-[#eee]': !isMine
          })}
        >
          {children}
        </div>
      </div>

      {isLastMsg && isMine && (
        <div
          className={classNames(
            'mt-1 flex items-center gap-1 justify-end',
            !isTyping ? 'min-h-[16px]' : ''
          )}
        >
          <img
            className={classNames(
              'w-4 h-4 rounded-full object-cover flex-shrink-0 transition-all duration-200 ease-in-out',
              isSeen && !showDelivered
                ? 'opacity-100 scale-100 '
                : 'scale-90 opacity-0'
            )}
            src={`${import.meta.env.VITE_IMG_URL}/users/${photo}`}
            alt={username}
          />
          {showDelivered && <p className="text-xs transition-all">Delivered</p>}
        </div>
      )}
    </>
  );
}
