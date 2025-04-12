import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import { Tour } from '../../../types/tour.type';
import Popover from '../../../components/Popover';
import Menu from '../../../components/Menu';
import MenuItem from '../../../components/MenuItem';
import { MdDelete } from 'react-icons/md';
import { LuPencilLine } from 'react-icons/lu';
import { formatCurrency } from '../../../utils/helpers';
import { format } from 'date-fns';
import Modal from '../../../components/Modal';
import DeleteTourContent from './DeleteTourContent';

export default function TourRow({ tour }: { tour: Tour }) {
  return (
    <tr
      className="bg-white border-b border-gray-200 text-main font-bold capitalize text-center"
      key={tour._id}
    >
      <td className="px-6 py-4">{tour.name}</td>
      <td scope="row" className="px-6 py-4">
        <img
          className="min-w-52 h-[108px] object-cover rounded-md"
          src={`${import.meta.env.VITE_API_BASE_URL}/img/tours/${
            tour.imageCover
          }`}
          alt={tour.name}
        />
      </td>
      <td className="px-6 py-4 text-left">
        <p className="min-w-[200px] text-left">{tour.startLocation.address}</p>
      </td>
      <td className="px-6 py-4 text-left">
        <div>
          {tour.startDates.map((day) => (
            <p key={day.date} className="text-nowrap">
              {format(day.date, 'dd-MM-yyyy')}
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
        {tour.ratingsAverage}({tour.ratingsQuantity})
      </td>
      <td className="px-6 py-4">
        <Modal>
          <Modal.Window name="delete-tour">
            <DeleteTourContent tourId={tour._id} name={tour.name} />
          </Modal.Window>

          <Popover
            className="center w-[38px] h-[30px] mx-auto hover:bg-gray-200 rounded-full"
            placement="bottom-center"
            renderPopover={
              <Menu>
                <Modal.Open openWindowName="delete-tour">
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
        </Modal>
      </td>
    </tr>
  );
}
