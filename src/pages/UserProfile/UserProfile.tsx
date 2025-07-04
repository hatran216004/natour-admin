import Main from '../../components/Main';

import background from '../../assets/images/user_background_default.jpg';
import { useAuthStore } from '../../store/auth.store';
import Information from './components/Information';
import Security from './components/Security';
import Conversations from './components/Conversations';
import Modal from '../../components/Modal';
import UserAvatar from './components/UserAvatar';

export default function UserProfile() {
  const { user } = useAuthStore();

  return (
    <Main>
      <div>
        <div className="relative cursor-pointer">
          <img
            src={background}
            alt="Background image"
            className="w-full h-[300px] rounded-lg object-cover"
          />

          <div className="absolute left-[10px] right-[10px] translate-y-1/4 bottom-0 bg-[rgba(226,232,240,0.8)] p-3 rounded-lg">
            <div className="flex items-start gap-3">
              <Modal>
                <UserAvatar />
              </Modal>
              <div>
                <p className="text-lg font-bold">{user?.name}</p>
                <p className="text-sm font-medium text-slate-600">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-10 gap-4">
          <Information />
          <Security />
          <Conversations />
        </div>
      </div>
    </Main>
  );
}
