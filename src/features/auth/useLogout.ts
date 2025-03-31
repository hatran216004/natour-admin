import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../services/auth.api';
import { useAuthStore } from '../../store/auth.store';
import toast from 'react-hot-toast';

function useLogout() {
  const navigate = useNavigate();
  const { setUser, setAccessToken } = useAuthStore();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setUser(null);
      setAccessToken(null);
      queryClient.removeQueries();
      toast.success('Logout successfully');
      navigate('/login');
    },
    onError: (err) => {
      console.log(err);
      toast.error('Logout error, try again later');
    }
  });

  return { logout: mutate, isPending };
}

export default useLogout;
