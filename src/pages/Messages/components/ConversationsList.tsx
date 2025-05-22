import { Conversation } from '../../../types/conversations.type';

export default function ConversationsList({
  data,
  render
}: {
  data: Conversation[];
  render: (conversation: Conversation) => React.ReactElement;
}) {
  return (
    <ul className="mt-7 space-y-1 overflow-auto max-h-[504px] pr-2 mr-2">
      {data.map(render)}
    </ul>
  );
}
