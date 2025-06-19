import classNames from 'classnames';

export default function ChatBubble({
  isMine,
  username,
  photo,
  children,
  isSeen,
  isLastMsg
}: {
  isMine?: boolean;
  username?: string;
  photo?: string;
  isSeen?: boolean;
  children: React.ReactNode;
  isLastMsg?: boolean;
}) {
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
      <div className="mt-1 flex items-center gap-1 justify-end">
        {isSeen && isMine && (
          <img
            className="w-4 h-4 rounded-full object-cover flex-shrink-0"
            src={`${import.meta.env.VITE_IMG_URL}/users/${photo}`}
            alt={username}
          />
        )}
        {!isSeen && isMine && isLastMsg && <p className="text-xs">Delivered</p>}
      </div>
    </>
  );
}
