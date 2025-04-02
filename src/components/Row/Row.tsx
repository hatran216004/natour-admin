import classNames from 'classNames';

export default function Row({
  classname,
  children
}: {
  classname?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={classNames('flex items-center gap-5', classname)}>
      {children}
    </div>
  );
}
