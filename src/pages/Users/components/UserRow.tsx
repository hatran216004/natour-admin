import classNames from 'classnames';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import { MdDelete } from 'react-icons/md';
import { LuPencilLine } from 'react-icons/lu';
import { User } from '../../../types/user.type';
import { SelectOptsType } from '../../../types/utils.type';
import Popover from '../../../components/Popover/Popover';
import MenuItem from '../../../components/MenuItem';
import Menu from '../../../components/Menu';
import Modal from '../../../components/Modal';
import DeleteUserContent from './DeleteUserContent';
import UpdateUserContent from './UpdateUserContent';
import UserListItem from '../../../components/UserListItem';

export default function UserRow({
  user,
  rolesOpts
}: {
  rolesOpts: SelectOptsType[];
  user: User;
}) {
  return (
    <tr
      className="bg-white border-b border-gray-200 font-medium"
      key={user._id}
    >
      <td scope="row" className="px-6 py-4">
        <UserListItem email={user.email} name={user.name} photo={user.photo} />
      </td>
      <td className="px-6 py-4 text-center">
        <span
          className={classNames(
            'px-4 py-1 text-center rounded-xl capitalize text-white font-bold',
            {
              'bg-[#48BB78]': user.active,
              'bg-[#CBD5E0]': !user.active
            }
          )}
        >
          {user.active ? 'active' : 'inactive'}
        </span>
      </td>
      <td className="px-6 py-4 text-center capitalize text-main">
        {user.role?.name}
      </td>
      <td className="px-6 py-4">
        <Modal closeMethods={['button', 'escape']}>
          <Popover
            className="center w-[38px] h-[30px] mx-auto hover:bg-gray-200 rounded-full"
            placement="bottom-center"
            renderPopover={
              <Menu>
                <Modal.Open name="delete-user">
                  <MenuItem text="delete" icon={<MdDelete />} />
                </Modal.Open>

                <Modal.Open name="update-user">
                  <MenuItem text="update" isLastItem icon={<LuPencilLine />} />
                </Modal.Open>
              </Menu>
            }
          >
            <button className="center px-3 py-2 cursor-pointer">
              <PiDotsThreeVerticalBold />
            </button>
          </Popover>
          <Modal.Content openName="delete-user">
            <DeleteUserContent userId={user._id} name={user.name} />
          </Modal.Content>

          <Modal.Content openName="update-user">
            <UpdateUserContent user={user} rolesOpts={rolesOpts} />
          </Modal.Content>
        </Modal>
      </td>
    </tr>
  );
}
