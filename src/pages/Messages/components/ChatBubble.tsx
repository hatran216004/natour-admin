import classNames from 'classnames';

export default function ChatBubble({
  message,
  isMine,
  username,
  photo
}: {
  message?: string;
  isMine?: boolean;
  username?: string;
  photo?: string;
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
          src={`${import.meta.env.VITE_API_BASE_URL}/img/users/${photo}`}
          alt={username}
        />
      )}
      <p
        className={classNames('p-2 rounded-xl', {
          'bg-primary text-white': isMine,
          'bg-white': !isMine
        })}
      >
        {message}
      </p>
    </div>
  );
}
