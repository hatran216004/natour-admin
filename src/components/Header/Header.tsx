import { useLocation } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { useAuthStore } from '../../store/auth.store';
import Spinner from '../Spinner';
import useLogout from '../../pages/Login/hooks/useLogout';

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
          <button
            id="dropdownNotificationButton"
            data-dropdown-toggle="dropdownNotification"
            className="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none"
            type="button"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 14 20"
            >
              <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
            </svg>

            <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5 dark:border-gray-900"></div>
          </button>
          <img
            src={`${import.meta.env.VITE_IMG_URL}/users/${user?.photo}`}
            alt={user?.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <h4 className="text-sm font-semibold capitalize">{user?.name}</h4>
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
