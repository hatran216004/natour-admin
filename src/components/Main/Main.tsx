import classNames from 'classnames';

export default function Main({
  cssClasses = '',
  children
}: {
  cssClasses?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        'relative flex-1 flex flex-col py-6 px-5 bg-white rounded-2xl shadow-custom',
        cssClasses
      )}
    >
      {children}
    </div>
  );
}
