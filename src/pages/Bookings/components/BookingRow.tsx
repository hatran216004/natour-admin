import { MdDelete } from 'react-icons/md';
import Menu from '../../../components/Menu';
import Modal from '../../../components/Modal';
import Popover from '../../../components/Popover';
import UserListItem from '../../../components/UserListItem';
import { Booking } from '../../../types/booking.type';
import { formatCurrency, formatDate } from '../../../utils/helpers';
import MenuItem from '../../../components/MenuItem';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DeleteBookingContent from './DeleteBookingContent';
import classNames from 'classnames';
import UpdateBookingContent from './UpdateBookingContent';
import { LuPencilLine } from 'react-icons/lu';
const cssStatus = {
  Paid: {
    bg: 'bg-[#48BB78]',
    text: 'text-white'
  },
  Unpaid: {
    bg: 'bg-yellow-300',
    text: 'text-yellow-600'
  },
  Failed: {
    bg: 'bg-red-300',
    text: 'text-red-600'
  },
  Refunded: {
    bg: 'bg-blue-200',
    text: 'text-blue-700'
  },
  Cancelled: {
    bg: 'bg-orange-200',
    text: 'text-orange-700'
  }
};

export default function BookingRow({ booking }: { booking: Booking }) {
  const bookingStatus = cssStatus[booking.paymentStatus];

  return (
    <tr className="bg-white border-b border-gray-200 text-nowrap font-medium capitalize">
      <td className="px-6 py-4 ">{booking.tour.name}</td>
      <td scope="row" className="px-6 py-4">
        <UserListItem
          email={booking.user.email}
          name={booking.user.name}
          photo={booking.user.photo}
        />
      </td>
      <td className="px-6 py-4 text-center">
        {formatCurrency(booking.amount)}
      </td>
      <td className="px-6 py-4 text-center capitalize text-main">
        {booking.participants}
      </td>
      <td className="px-6 py-4">
        <span
          className={classNames(
            'block px-4 py-1 text-center rounded-xl capitalize font-bold',
            bookingStatus.bg,
            bookingStatus.text
          )}
        >
          {booking.paymentStatus.split('-').join(' ')}
        </span>
      </td>
      <td className="px-6 py-4">{booking.paymentMethod}</td>
      <td className="px-6 py-4">
        <p className="line-clamp-2 text-wrap">{booking.specialRequirements}</p>
      </td>
      <td className="px-6 py-4">{formatDate(booking.startDate, true)}</td>
      <td className="px-6 py-4">{formatDate(booking.createdAt, true)}</td>
      <td className="px-6 py-4">{formatDate(booking.updatedAt, true)}</td>
      <td className="px-6 py-4">
        <Modal closeMethods={['button', 'escape']}>
          <Popover
            className="center w-[38px] h-[30px] mx-auto hover:bg-gray-200 rounded-full"
            placement="bottom-center"
            renderPopover={
              <Menu>
                <Modal.Open name="delete-booking">
                  <MenuItem text="delete" icon={<MdDelete />} />
                </Modal.Open>

                <Modal.Open name="update-booking">
                  <MenuItem text="update" icon={<LuPencilLine />} />
                </Modal.Open>

                <Link to={`${booking._id}`}>
                  <MenuItem text="see detail" isLastItem icon={<FaEye />} />
                </Link>
              </Menu>
            }
          >
            <button className="center px-3 py-2 cursor-pointer">
              <PiDotsThreeVerticalBold />
            </button>
          </Popover>

          <Modal.Content openName="delete-booking">
            <DeleteBookingContent bookingId={booking._id} />
          </Modal.Content>

          <Modal.Content openName="update-booking">
            <UpdateBookingContent
              booking={booking}
              statusOpts={[
                { label: 'Paid', value: 'Paid' },
                { label: 'Unpaid', value: 'Unpaid' },
                {
                  label: 'Failed',
                  value: 'Failed'
                },
                { label: 'Cancelled', value: 'Cancelled' },
                {
                  label: 'Rufunded',
                  value: 'Rufunded'
                }
              ]}
            />
          </Modal.Content>
        </Modal>
      </td>
    </tr>
  );
}
