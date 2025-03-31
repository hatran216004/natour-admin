import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import { User } from '../../types/user.type';
import Popover from '../Popover/Popover';
import MenuItem from '../MenuItem';
import { MdDelete } from 'react-icons/md';
import { LuPencilLine } from 'react-icons/lu';
import Menu from '../Menu/';
import Modal from '../Modal';
import DeleteUserContent from '../../pages/Users/components/DeleteUserContent';

export default function UserRow({ user }: { user: User }) {
  return (
    <tr className="bg-white border-b border-gray-200" key={user.id}>
      <td scope="row" className="px-6 py-4 flex gap-[14px] items-center">
        <img
          className="w-10 h-10 object-cover rounded-xl"
          src={`${import.meta.env.VITE_API_BASE_URL}/img/users/${user.photo}`}
          alt={user.name}
        />
        <div>
          <h2 className="text-main text-sm font-bold capitalize">
            {user.name}
          </h2>
          <h2 className="text-[#718096] text-sm">{user.email}</h2>
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <button
          className={`px-4 py-1 text-center ${
            user.active ? 'bg-[#48BB78]' : 'bg-[#CBD5E0]'
          } rounded-xl capitalize text-white font-bold`}
        >
          {user.active ? 'active' : 'inactive'}
        </button>
      </td>
      <td className="px-6 py-4 text-center capitalize text-main font-bold">
        {user.role?.name}
      </td>
      <td className="px-6 py-4">
        <Modal>
          <Popover
            className="center w-[38px] h-[30px] mx-auto hover:bg-gray-200 rounded-full"
            placement="bottom-center"
            renderPopover={
              <Menu>
                <Modal.Open openWindowName="delete">
                  <MenuItem text="delete" icon={<MdDelete />} />
                </Modal.Open>
                <MenuItem text="update" isLastItem icon={<LuPencilLine />} />
              </Menu>
            }
          >
            <button className="center px-3 py-2 cursor-pointer">
              <PiDotsThreeVerticalBold />
            </button>
          </Popover>

          <Modal.Window name="delete">
            <DeleteUserContent />
          </Modal.Window>
        </Modal>
      </td>
    </tr>
  );
}
