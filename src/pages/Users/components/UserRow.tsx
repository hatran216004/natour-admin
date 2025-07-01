import classNames from 'classnames';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import { User } from '../../../types/user.type';
import { SelectOptsType } from '../../../types/utils.type';
import Popover from '../../../components/Popover/Popover';
import MenuItem from '../../../components/MenuItem';
import Menu from '../../../components/Menu';
import Modal from '../../../components/Modal';
import DeleteUserContent from './DeleteUserContent';
import UpdateUserContent from './UpdateUserContent';
import UserListItem from '../../../components/UserListItem';
import { Check, X } from 'lucide-react';

export default function UserRow({
  user,
  rolesOpts
}: {
  rolesOpts: SelectOptsType[];
  user: User;
}) {
  return (
    <tr className="hover:bg-gray-50 transition-colors" key={user._id}>
      <td scope="row" className="px-6 py-4 whitespace-nowrap">
        <UserListItem
          email={user.email}
          name={user.name}
          photo={user.photo}
          lineClamp={false}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={classNames(
            'capitalize inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors',
            user.active
              ? 'bg-green-100 text-green-800 hover:bg-green-200'
              : 'bg-red-100 text-red-800 hover:bg-red-200'
          )}
        >
          {user.active ? (
            <>
              <Check className="h-3 w-3 mr-1" />
              Active
            </>
          ) : (
            <>
              <X className="h-3 w-3 mr-1" />
              Inactive
            </>
          )}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full capitalize">
          {user.role?.name}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Modal closeMethods={['button', 'escape']}>
          <Popover
            className="center w-[38px] h-[30px] hover:bg-gray-200 rounded-full"
            placement="bottom-center"
            renderPopover={
              <Menu>
                <Modal.Open name="delete-user">
                  <MenuItem text="delete" />
                </Modal.Open>

                <Modal.Open name="update-user">
                  <MenuItem text="update" isLastItem />
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
