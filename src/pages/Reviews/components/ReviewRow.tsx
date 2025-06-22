import { MdDelete } from 'react-icons/md';
import Modal from '../../../components/Modal';
import { Review } from '../../../types/review.type';
import MenuItem from '../../../components/MenuItem';
import DeleteReviewContent from './DeleteReviewContent';
import { formatDate } from '../../../utils/helpers';

export default function ReviewRow({ review }: { review: Review }) {
  return (
    <tr
      className="bg-white border-b border-gray-200 font-medium"
      key={review._id}
    >
      <td scope="row" className="px-6 py-4">
        <div className="flex gap-[14px] items-center">
          <img
            className="w-10 h-10 object-cover rounded-xl"
            src={`${import.meta.env.VITE_IMG_URL}/users/${review.user.photo}`}
            alt={review.user.name}
          />
          <h2 className="text-main text-sm capitalize text-nowrap">
            {review.user.name}
          </h2>
        </div>
      </td>
      <td className="px-6 py-4 text-left text-main">
        <p className="line-clamp-2">{review.review}</p>
      </td>
      <td className="px-6 py-4 text-center text-main">{review.rating}⭐</td>
      <td className="px-6 py-4 text-center capitalize text-main">
        <p className="line-clamp-2">{review.tour.name}</p>
      </td>
      <td className="px-6 py-4 text-center capitalize text-main">
        {formatDate(review.createdAt)}
      </td>
      <td className="px-6 py-4">
        <Modal>
          <Modal.Open name="delete-review">
            <MenuItem
              text="delete"
              icon={<MdDelete />}
              isLastItem
              className="rounded-full text-gray-500 mx-auto"
            />
          </Modal.Open>
          <Modal.Content openName="delete-review">
            <DeleteReviewContent reviewId={review._id} />
          </Modal.Content>
        </Modal>
      </td>
    </tr>
  );
}
