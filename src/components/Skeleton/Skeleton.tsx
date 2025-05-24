import classNames from 'classnames';

export default function Skeleton({
  size = 'sm',
  cssClasses = '',
  side = 'left'
}: {
  size?: 'sm' | 'md' | 'lg';
  cssClasses?: string;
  side?: 'left' | 'right';
}) {
  const height = size === 'sm' ? '2' : size === 'md' ? '6' : '8';

  return (
    <div
      role="status"
      className={classNames('animate-pulse flex flex-col', cssClasses, {
        'items-end': side === 'right',
        'items-start': side === 'left'
      })}
    >
      <div className={`h-${height}.5 bg-gray-200 rounded-full w-48 mb-4`}></div>
      <div
        className={`h-${height} bg-gray-200 rounded-full w-[360px] mb-2.5`}
      ></div>
      <div className={`h-${height} bg-gray-200 rounded-full mb-2.5`}></div>
      <div
        className={`h-${height} bg-gray-200 rounded-full w-[330px] mb-2.5`}
      ></div>
      <div
        className={`h-${height} bg-gray-200 rounded-full w-[300px] mb-2.5`}
      ></div>
      <div
        className={`h-${height} bg-gray-200 rounded-full w-[360px] mb-2.5`}
      ></div>
      <div className={`h-${height}.5 bg-gray-200 rounded-full w-48 mb-4`}></div>
      <div
        className={`h-${height} bg-gray-200 rounded-full w-[360px] mb-2.5`}
      ></div>
      <div className={`h-${height} bg-gray-200 rounded-full mb-2.5`}></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
