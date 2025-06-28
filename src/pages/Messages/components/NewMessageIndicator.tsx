import { IoArrowDown } from 'react-icons/io5';

const NewMessageIndicator = ({
  newMessageCount = 0,
  onScrollToBottom,
  isVisible
}: {
  newMessageCount?: number;
  onScrollToBottom?: () => void;
  isVisible?: boolean;
}) => {
  if (!isVisible || newMessageCount === 0) return null;

  return (
    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50">
      <button
        onClick={onScrollToBottom}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-200 animate-pulse"
      >
        <span className="text-sm font-medium">
          {newMessageCount} new messages
        </span>
        <IoArrowDown size={16} />
      </button>
    </div>
  );
};

export default NewMessageIndicator;
