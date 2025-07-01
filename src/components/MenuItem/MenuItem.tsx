import classNames from 'classnames';
import { Edit, Eye, Trash2 } from 'lucide-react';

type MenuItemProps = {
  isLastItem?: boolean;
  text: 'delete' | 'update' | 'detail';
  className?: string;
  onClick?: () => void;
};

export default function MenuItem({
  isLastItem,
  text,
  className,
  onClick
}: MenuItemProps) {
  function handleClick() {
    onClick?.();
  }

  const renderIcon = () => {
    switch (text) {
      case 'update':
        return <Edit size={16} />;
      case 'delete':
        return <Trash2 size={16} />;
      case 'detail':
        return <Eye size={16} />;
      default:
        return null;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={classNames(
        'px-5 py-2.5 border-b border-gray-200 flex items-center gap-3 hover:bg-gray-100 w-full',
        className,
        {
          'border-b-0': isLastItem
        }
      )}
    >
      {renderIcon()}
      <p className="font-semibold">{text[0].toUpperCase() + text?.slice(1)}</p>
    </button>
  );
}
