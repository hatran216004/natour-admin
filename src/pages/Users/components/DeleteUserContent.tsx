import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../../../services/user.api';
import toast from 'react-hot-toast';
import Spinner from '../../../components/Spinner';

export default function DeleteUserContent({
  userId,
  name,
  onCloseModal
}: {
  userId: string;
  name: string;
  onCloseModal?: () => void;
}) {
  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: userApi.deleteUser
  });
  const queryClient = useQueryClient();

  function handleDeleteUser() {
    if (!userId) return;
    deleteUser(userId, {
      onSuccess: () => {
        toast.success(`User ${name} deleted`);
        queryClient.invalidateQueries({
          queryKey: ['users']
        });
        onCloseModal?.();
      },
      onError: (err) => {
        toast.error(err.message);
      }
    });
  }

  return (
    <div className="p-4 md:p-5 text-center">
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
        Are you sure you want to delete this user?
      </h3>
      <div className="flex items-center justify-center">
        <button
          onClick={handleDeleteUser}
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
