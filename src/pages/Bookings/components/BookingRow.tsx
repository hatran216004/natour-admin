import Menu from '../../../components/Menu';
import Modal from '../../../components/Modal';
import Popover from '../../../components/Popover';
import UserListItem from '../../../components/UserListItem';
import { Booking } from '../../../types/booking.type';
import { formatCurrency, formatDate } from '../../../utils/helpers';
import MenuItem from '../../../components/MenuItem';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import DeleteBookingContent from './DeleteBookingContent';
import classNames from 'classnames';
import UpdateBookingContent from './UpdateBookingContent';

const cssStatus = {
  Paid: {
    bg: 'bg-green-100 hover:bg-green-200',
    text: 'text-green-800'
  },
  Unpaid: {
    bg: 'bg-yellow-100 hover:bg-yellow-200',
    text: 'text-yellow-800'
  },
  Failed: {
    bg: 'bg-red-100 hover:bg-red-200',
    text: 'text-red-800'
  },
  Refunded: {
    bg: 'bg-blue-100 hover:bg-blue-200',
    text: 'text-blue-800'
  },
  Cancelled: {
    bg: 'bg-orange-100 hover:bg-orange-200',
    text: 'text-orange-800'
  }
};

export default function BookingRow({ booking }: { booking: Booking }) {
  const bookingStatus = cssStatus[booking.paymentStatus];

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">{booking.tour.name}</td>
      <td scope="row" className="px-6 py-4">
        <UserListItem
          email={booking.user.email}
          name={booking.user.name}
          photo={booking.user.photo}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {formatCurrency(booking.amount)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.participants}</td>
      <td className="px-6 py-4 whitespace-nowrap">
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
      <td className="px-6 py-4 whitespace-nowrap">{booking.paymentMethod}</td>
      <td className="px-6 py-4">
        <p className="line-clamp-2 text-wrap">{booking.specialRequirements}</p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {formatDate(booking.startDate, true)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {formatDate(booking.createdAt, true)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {formatDate(booking.updatedAt, true)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Modal closeMethods={['button', 'escape']}>
          <Popover
            className="center w-[38px] h-[30px] hover:bg-gray-200 rounded-full"
            placement="bottom-center"
            renderPopover={
              <Menu>
                <Modal.Open name="delete-booking">
                  <MenuItem text="delete" />
                </Modal.Open>

                <Modal.Open name="update-booking">
                  <MenuItem text="update" />
                </Modal.Open>

                <Link to={`${booking._id}`}>
                  <MenuItem text="detail" isLastItem />
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
                  label: 'Refunded',
                  value: 'Refunded'
                }
              ]}
            />
          </Modal.Content>
        </Modal>
      </td>
    </tr>
  );
}
