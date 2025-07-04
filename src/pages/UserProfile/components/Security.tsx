import { Pencil } from 'lucide-react';
import Modal from '../../../components/Modal';
import UpdatePasswordContent from './UpdatePasswordContent';

export default function Security() {
  return (
    <Modal>
      <div className="col-span-4 rounded-md bg-white shadow-md p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium text-slate-600">Security</h4>
          <Modal.Open name="update-password">
            <button className=" text-primary bg-white p-2 rounded-md hover:bg-gray-100 shadow-md">
              <Pencil size={18} />
            </button>
          </Modal.Open>
        </div>
        <div className="mt-4 space-y-2 max-h-[160px] overflow-auto">
          <div className="flex items-center gap-2 justify-between">
            <label className="text-slate-500 text-sm min-w-[80px]">
              Current password:
            </label>
            <input
              type="password"
              className="border rounded-md px-2 py-1 text-sm disabled:bg-gray-200 outline-none"
              placeholder="********"
              disabled
            />
          </div>
          <div className="flex items-center gap-2 justify-between">
            <label className="text-slate-500 text-sm min-w-[80px]">
              New Password:
            </label>
            <input
              type="password"
              className="border rounded-md px-2 py-1 text-sm disabled:bg-gray-200 outline-none"
              placeholder="********"
              disabled
            />
          </div>
          <div className="flex items-center gap-2 justify-between">
            <label className="text-slate-500 text-sm min-w-[80px]">
              Confirm new password:
            </label>
            <div>
              <input
                type="password"
                className="border rounded-md px-2 py-1 text-sm disabled:bg-gray-200 outline-none"
                placeholder="********"
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <Modal.Content openName="update-password">
        <UpdatePasswordContent />
      </Modal.Content>
    </Modal>
  );
}
