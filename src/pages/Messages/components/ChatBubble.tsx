import classNames from 'classnames';

export default function ChatBubble({
  isMine,
  username,
  photo,
  children,
  isSeen
}: {
  isMine?: boolean;
  username?: string;
  photo?: string;
  isSeen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
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
          className={classNames('px-2 py-1 rounded-xl', {
            'bg-primary text-white': isMine,
            'bg-[#eee]': !isMine
          })}
        >
          {children}
        </div>
      </div>
      {isSeen && isMine && <p className="text-xs mt-1 ml-auto">Seen </p>}
    </div>
  );
}
