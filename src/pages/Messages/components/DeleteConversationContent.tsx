import { useMutation, useQueryClient } from '@tanstack/react-query';
import Spinner from '../../../components/Spinner';
import { conversationsApi } from '../../../services/conversation.api';
import { useSelectedConversation } from '../../../store/messages.store';
import toast from 'react-hot-toast';

export default function DeleteConversationContent({
  onCloseModal
}: {
  onCloseModal?: () => void;
}) {
  const queryClient = useQueryClient();
  const {
    selectedConversation: { _id },
    setSelectedConversation
  } = useSelectedConversation();
  const { isPending, mutate } = useMutation({
    mutationFn: conversationsApi.deleteConversation
  });

  function handler() {
    mutate(_id, {
      onSuccess: () => {
        toast.success('Delete conversation successfully');
        queryClient.invalidateQueries({
          queryKey: ['conversations']
        });

        queryClient.removeQueries({
          queryKey: ['messages-conversation', _id]
        });

        setSelectedConversation({
          _id: '',
          userId: '',
          photo: '',
          username: '',
          email: '',
          mock: false
        });
        onCloseModal?.();
      },
      onError: () => {
        toast.error('Fail to delete this conversation');
      }
    });
  }

  return (
    <div className="text-center">
      <svg
        className="mx-auto mb-4 text-gray-400 w-12 h-12"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <h3 className="mb-5 text-lg font-normal text-gray-500">
        Are you sure you want to delete this conversations?
      </h3>
      <div className="flex items-center justify-center">
        <button
          onClick={handler}
          disabled={isPending}
          className="min-w-[108px] h-[42px] text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm flex items-center justify-center"
        >
          {isPending ? <Spinner size="md" /> : "Yes, I'm sure"}
        </button>
        <button
          disabled={isPending}
          onClick={() => onCloseModal?.()}
          className="min-w-[108px] h-[42px] ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
        >
          No, cancel
        </button>
      </div>
    </div>
  );
}
