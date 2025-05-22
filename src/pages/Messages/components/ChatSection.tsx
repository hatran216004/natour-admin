import ChatBody from './ChatBody';
import ChatHeader from './ChatHeader';

export default function ChatSection() {
  return (
    <div className="bg-white h-full rounded-lg py-4 shadow-lg flex flex-col">
      <ChatHeader />
      <ChatBody />
    </div>
  );
}
