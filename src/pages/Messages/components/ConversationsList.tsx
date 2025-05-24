import { Conversation } from '../../../types/conversations.type';

export default function ConversationsList({
  data,
  render
}: {
  data: Conversation[];
  render: (conversation: Conversation) => React.ReactElement;
}) {
  return (
    <ul className="mt-7 space-y-2 max-h-[412px] overflow-auto mr-2 pr-2 pl-4">
      {data.map(render)}
    </ul>
  );
}
