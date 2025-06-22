import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import { Tour } from '../../../types/tour.type';
import Popover from '../../../components/Popover';
import Menu from '../../../components/Menu';
import MenuItem from '../../../components/MenuItem';
import { MdDelete } from 'react-icons/md';
import { LuPencilLine } from 'react-icons/lu';
import { formatCurrency, formatDate } from '../../../utils/helpers';
import Modal from '../../../components/Modal';
import DeleteTourContent from './DeleteTourContent';
import UpdateTourContent from './UpdateTourContent';

export default function TourRow({ tour }: { tour: Tour }) {
  return (
    <tr
      className="bg-white border-b border-gray-200 text-main capitalize text-center font-medium"
      key={tour._id}
    >
      <td className="px-6 py-4">{tour.name}</td>
      <td scope="row" className="px-6 py-4">
        <img
          className="min-w-52 h-[108px] object-cover rounded-md"
          src={`${import.meta.env.VITE_IMG_URL}/tours/${tour.imageCover}`}
          alt={tour.name}
        />
      </td>
      <td className="px-6 py-4 text-left">
        <p className="min-w-[200px] text-left">{tour.startLocation.address}</p>
      </td>
      <td className="px-6 py-4 text-left">
        <div>
          {tour.startDates.map((day, index) => (
            <p key={index} className="text-nowrap">
              {formatDate(day.date)}
            </p>
          ))}
        </div>
      </td>
      <td className="px-6 py-4">{tour.difficulty}</td>
      <td className="px-6 py-4">{tour.duration} days</td>
      <td className="px-6 py-4">
        <p className="min-w-[200px] text-left">
          {tour.guides.map((guide) => guide.name).join(', ')}
        </p>
      </td>
      <td className="px-6 py-4">{tour.maxGroupSize}</td>
      <td className="px-6 py-4">{formatCurrency(tour.price)}</td>
      <td className="px-6 py-4">
        {tour.ratingsAverage}⭐({tour.ratingsQuantity})
      </td>
      <td className="px-6 py-4">
        <Modal closeMethods={['button', 'escape']}>
          <Popover
            className="center w-[38px] h-[30px] mx-auto hover:bg-gray-200 rounded-full"
            placement="bottom-center"
            renderPopover={
              <Menu>
                <Modal.Open name="delete-tour">
                  <MenuItem text="delete" icon={<MdDelete />} />
                </Modal.Open>
                <Modal.Open name="update-tour">
                  <MenuItem text="update" isLastItem icon={<LuPencilLine />} />
                </Modal.Open>
              </Menu>
            }
          >
            <button className="center px-3 py-2 cursor-pointer">
              <PiDotsThreeVerticalBold />
            </button>
          </Popover>
          <Modal.Content openName="delete-tour">
            <DeleteTourContent tourId={tour._id} name={tour.name} />
          </Modal.Content>
          <Modal.Content openName="update-tour">
            <UpdateTourContent tourId={tour._id} />
          </Modal.Content>
        </Modal>
      </td>
    </tr>
  );
}
