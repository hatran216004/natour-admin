import { Booking } from '../../../types/booking.type';
import { formatCurrency, formatDate } from '../../../utils/helpers';

export default function BookingTourInfo({ booking }: { booking: Booking }) {
  const { tour } = booking;

  function calcEndDate() {
    if (!booking) return;
    const date = new Date(booking.startDate);
    return formatDate(new Date(date.setDate(date.getDate() + tour.duration)));
  }

  return (
    <div className="flex items-start space-x-4">
      <img
        src={`${import.meta.env.VITE_IMG_URL}/tours/${tour.imageCover}`}
        alt={tour.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {tour.name} ({tour.duration} day
          {tour.duration > 1 && 's'}{' '}
          {tour.duration - 1 > 0 ? `${tour.duration - 1} nights` : ''})
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Duration weeks:</span>
            <span className="font-medium ml-2">{tour.durationWeeks}</span>
          </div>
          <div>
            <span className="text-gray-500">Difficulty:</span>
            <span className="font-medium ml-2">{tour.difficulty}</span>
          </div>
          <div>
            <span className="text-gray-500">Start date:</span>
            <span className="font-medium ml-2">
              {formatDate(booking.startDate)}
            </span>
          </div>
          <div>
            <span className="text-gray-500">End date:</span>
            <span className="font-medium ml-2">{calcEndDate()}</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-gray-800">
          {formatCurrency(booking.price)}
        </div>
        <div className="text-sm text-gray-500">
          / {booking.participants} participant
          {booking.participants > 1 && 's'}
        </div>
      </div>
    </div>
  );
}
