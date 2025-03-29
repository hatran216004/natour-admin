import { useLocation } from 'react-router-dom';
import Search from '../Search';
import { FiLogOut } from 'react-icons/fi';
import { useAuthStore } from '../../store/auth.store';
import useLogout from '../../featurs/auth/useLogout';
import Spinner from '../Spinner';

export default function Header() {
  const { logout, isPending } = useLogout();
  const location = useLocation();
  const { user } = useAuthStore();
  const pageName = location.pathname.split('/')[1];

  return (
    <header>
      <div className="px-4 pb-7 flex items-center justify-between">
        <div className="flex items-center capitalize gap-2 text-sm">
          <span className="text-[#A0AEC0]">Pages</span>
          <span className="text-[#2D3748]">/ {pageName}</span>
        </div>
        <div className="center gap-[18px]">
          <Search />
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/img/users/${
              user?.photo
            }`}
            alt={user?.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <button
            className="center gap-3 cursor-pointer p-2"
            onClick={() => logout()}
          >
            {isPending ? <Spinner size="sm" /> : <FiLogOut />}
            logout
          </button>
        </div>
      </div>
    </header>
  );
}
