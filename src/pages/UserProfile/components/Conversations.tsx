import { Link } from 'react-router-dom';
import UserListItem from '../../../components/UserListItem';
import useConversations from '../../Messages/hooks/useConversations';
import {
  useMessages,
  useSelectedConversation
} from '../../../store/messages.store';
import { Participant } from '../../../types/conversations.type';
import { useQueryClient } from '@tanstack/react-query';
import { conversationsApi } from '../../../services/conversation.api';
import toast from 'react-hot-toast';

export default function Conversations() {
  const { conversations } = useConversations();
  const { setSelectedConversation } = useSelectedConversation();
  const queryClient = useQueryClient();
  const { setMessages } = useMessages();

  const handleClick = async (
    participant: Participant,
    conversationId: string
  ) => {
    const { _id, email, name, photo } = participant;
    setSelectedConversation({
      _id: conversationId,
      email,
      photo,
      username: name,
      userId: _id,
      mock: false
    });

    try {
      const existingData = queryClient.getQueryData([
        'messages-conversation',
        conversationId
      ]);

      if (!existingData) {
        const data = await queryClient.fetchQuery({
          queryKey: ['messages-conversation', conversationId],
          queryFn: () => conversationsApi.getAllMessages(conversationId)
        });
        setMessages(data.data.data.messages);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Something went wrong. Please try again later!');
    }
  };

  return (
    <div className="col-span-4 rounded-md bg-white shadow-md p-4">
      <h4 className="text-lg font-medium text-slate-600">Conversations</h4>
      <div className="mt-4 space-y-2 max-h-[170px] overflow-auto">
        {conversations?.length &&
          conversations.map((conv) => {
            const { email, name, photo } = conv.participants[0];
            return (
              <div
                key={conv._id}
                className="flex items-start justify-between"
                onClick={() => handleClick(conv.participants[0], conv._id)}
              >
                <UserListItem email={email} name={name} photo={photo} />
                <Link
                  to="/chat"
                  className="mt-auto text-xs text-primary hover:underline"
                >
                  Go to conversation
                </Link>
              </div>
            );
          })}
        {!conversations?.length && (
          <p className="text-lg text-slate-400 font-bold text-center">
            No conversations
          </p>
        )}
      </div>
    </div>
  );
}
