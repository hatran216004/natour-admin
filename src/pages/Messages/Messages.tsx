import Main from '../../components/Main';
import ConversationsSection from './components/ConversationsSection';
import ChatSection from './components/ChatSection';

export default function Messages() {
  return (
    <Main>
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-4">
          <ConversationsSection />
        </div>
        <div className="col-span-8">
          <ChatSection />
        </div>
      </div>
    </Main>
  );
}
