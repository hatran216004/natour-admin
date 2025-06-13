import classNames from 'classnames';

export default function ChatBubble({
  isMine,
  username,
  photo,
  children
}: {
  isMine?: boolean;
  username?: string;
  photo?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames('flex gap-[14px] items-end', {
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
  );
}
