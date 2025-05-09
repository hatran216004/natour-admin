import classNames from 'classnames';
import { JSX } from 'react';

type MenuItemProps = {
  isLastItem?: boolean;
  icon?: JSX.Element;
  text: string;
  onClick?: () => void;
};

export default function MenuItem({
  isLastItem,
  text,
  icon,
  onClick
}: MenuItemProps) {
  function handleClick() {
    // e.stopPropagation(); // không đóng menu khi click menu item
    onClick?.();
  }

  return (
    <button
      onClick={handleClick}
      className={classNames(
        'px-5 py-2.5 border-b border-gray-200 flex items-center gap-3 hover:bg-gray-100',
        {
          'border-b-0': isLastItem
        }
      )}
    >
      {icon && icon}
      <p className="font-semibold capitalize">{text}</p>
    </button>
  );
}
