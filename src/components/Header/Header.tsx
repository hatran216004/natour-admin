import { useLocation } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { useAuthStore } from '../../store/auth.store';
import useLogout from '../../features/auth/useLogout';
import Spinner from '../Spinner';
import { CiBellOn } from 'react-icons/ci';

export default function Header() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthStore();
  const location = useLocation();
  const pageName = location.pathname.split('/')[1];

  return (
    <header>
      <div className="px-4 pb-7 flex items-center justify-between">
        <div className="flex items-center capitalize gap-2 text-sm">
          <span className="text-[#A0AEC0]">Pages</span>
          <span className="text-[#2D3748]">/ {pageName}</span>
        </div>
        <div className="center gap-[18px]">
          <button>
            <CiBellOn size={26} />
          </button>
          <img
            src={`${import.meta.env.VITE_IMG_URL}/users/${user?.photo}`}
            alt={user?.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <button
            className="center gap-3 cursor-pointer py-2 px-3 hover:opacity-60"
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
