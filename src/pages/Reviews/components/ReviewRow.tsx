import Modal from '../../../components/Modal';
import { Review } from '../../../types/review.type';
import MenuItem from '../../../components/MenuItem';
import DeleteReviewContent from './DeleteReviewContent';
import { formatDate } from '../../../utils/helpers';

export default function ReviewRow({ review }: { review: Review }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors" key={review._id}>
      <td scope="row" className="px-6 py-4 whitespace-nowrap">
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
      <td className="px-6 py-4">
        <p className="line-clamp-2">{review.review}</p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{review.rating}⭐</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <p className="line-clamp-2">{review.tour.name}</p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {formatDate(review.createdAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Modal>
          <Modal.Open name="delete-review">
            <MenuItem
              text="delete"
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
