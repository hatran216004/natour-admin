import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import Popover from '../../../components/Popover/Popover';
import MenuItem from '../../../components/MenuItem';
import Menu from '../../../components/Menu';
import Modal from '../../../components/Modal';
import { Permission } from '../../../types/permission.type';
import DeletePermissionContent from './DeletePermissionContent';
import UpdatePermissionContent from './UpdatePermissionContent';

export default function UserRow({ permission }: { permission: Permission }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">{permission.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{permission.description}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Modal closeMethods={['button', 'escape']}>
          <Popover
            className="center w-[38px] h-[30px] hover:bg-gray-200 rounded-full"
            placement="bottom-center"
            renderPopover={
              <Menu>
                <Modal.Open name="delete-permission">
                  <MenuItem text="delete" />
                </Modal.Open>

                <Modal.Open name="update-permission">
                  <MenuItem text="update" isLastItem />
                </Modal.Open>
              </Menu>
            }
          >
            <button className="center px-3 py-2 cursor-pointer">
              <PiDotsThreeVerticalBold />
            </button>
          </Popover>
          <Modal.Content openName="delete-permission">
            <DeletePermissionContent
              permissionId={permission._id}
              name={permission.description}
            />
          </Modal.Content>

          <Modal.Content openName="update-permission">
            <UpdatePermissionContent permission={permission} />
          </Modal.Content>
        </Modal>
      </td>
    </tr>
  );
}
