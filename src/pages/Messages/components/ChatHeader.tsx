import classNames from 'classnames';
import { useSocket } from '../../../context/SocketContext';
import { useSelectedConversation } from '../../../store/messages.store';
import Popover from '../../../components/Popover';
import Menu from '../../../components/Menu';
import MenuItem from '../../../components/MenuItem';
import { MdDelete, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Modal from '../../../components/Modal';
import DeleteConversationContent from './DeleteConversationContent';

export default function ChatHeader() {
  const { selectedConversation } = useSelectedConversation();
  const { onlineUsers } = useSocket();

  if (!selectedConversation.userId) return null;

  return (
    <div className="flex items-center gap-10 pb-3 px-4 border-b-2 border-gray-100">
      <div className="flex gap-[14px] items-center">
        <figure className="relative">
          <img
            className="w-10 h-10 object-cover rounded-full"
            src={`${import.meta.env.VITE_IMG_URL}/users/${
              selectedConversation?.photo
            }`}
            alt={selectedConversation?.username}
          />
          <span
            className={classNames(
              'w-3 h-3 border-gray-600 border-2 rounded-full  absolute right-0 bottom-0',
              {
                'bg-green-500': onlineUsers.includes(
                  selectedConversation.userId
                ),
                'bg-gray-400': !onlineUsers.includes(
                  selectedConversation.userId
                )
              }
            )}
          ></span>
        </figure>
        <div>
          <h2 className="text-main text-sm font-bold capitalize">
            {selectedConversation?.username}
          </h2>
          <h2 className="text-[#718096] text-sm">
            {selectedConversation?.email}
          </h2>
        </div>
      </div>

      <Modal>
        <Popover
          className="center w-[38px] h-[30px] hover:bg-gray-200 rounded-full"
          placement="bottom-center"
          renderPopover={
            <Menu>
              <Modal.Open name="delete-conversation">
                <MenuItem
                  className="border-b-slate-50"
                  text="delete conversation"
                  icon={<MdDelete />}
                />
              </Modal.Open>
            </Menu>
          }
        >
          <button className="center px-3 py-2 cursor-pointer">
            <MdOutlineKeyboardArrowDown />
          </button>
        </Popover>
        <Modal.Content openName="delete-conversation">
          <DeleteConversationContent />
        </Modal.Content>
      </Modal>
    </div>
  );
}
