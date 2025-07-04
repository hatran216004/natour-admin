import { Pencil } from 'lucide-react';
import { useAuthStore } from '../../../store/auth.store';
import Modal from '../../../components/Modal';
import UpdateMeContent from './UpdateMeContent';

export default function Information() {
  const { user } = useAuthStore();

  return (
    <Modal>
      <div className="col-span-4 rounded-md bg-white shadow-md p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium text-slate-600">
            Profile Information
          </h4>
          <Modal.Open name="update-profile">
            <button className=" text-primary bg-white p-2 rounded-md hover:bg-gray-100 shadow-md">
              <Pencil size={18} />
            </button>
          </Modal.Open>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-sm min-w-[80px]">
              Full name:
            </span>
            <span className="text-slate-700 font-semibold">{user?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-sm min-w-[80px]">Email:</span>
            <span className="text-slate-700 font-semibold truncate">
              {user?.email}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-sm min-w-[80px]">Role:</span>
            <span className="text-slate-700 font-semibold capitalize">
              {user?.role?.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-sm min-w-[80px]">Active:</span>
            <div className="flex items-center gap-2">
              {user?.active ? (
                <>
                  <span className="text-slate-700 font-semibold">Active</span>
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                </>
              ) : (
                <>
                  <span className="text-slate-700 font-semibold">Inactive</span>
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal.Content openName="update-profile">
        <UpdateMeContent />
      </Modal.Content>
    </Modal>
  );
}
