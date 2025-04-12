import classNames from 'classnames';

export default function Row({
  className,
  align = 'center',
  children
}: {
  className?: string;
  align?: 'center' | 'start' | 'end';
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(className, 'flex gap-5', {
        'items-center': align === 'center',
        'items-start': align === 'start',
        'items-end': align === 'end'
      })}
    >
      {children}
    </div>
  );
}
