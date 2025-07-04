import { useQuery } from '@tanstack/react-query';
import { bookingApi } from '../../../services/booking.api';
import { formatCurrency } from '../../../utils/helpers';
import useUrl from '../../../hooks/useUrl';
import Spinner from '../../../components/Spinner';

export default function TopBooked() {
  const { currentValue: limit, handler } = useUrl({
    field: 'limit',
    defaultValue: 3
  });

  const { data, isLoading } = useQuery({
    queryKey: ['top-booked', limit],
    queryFn: () => bookingApi.getTopBooked(Number(limit))
  });
  const topBookedData = data?.data.data.data;

  return (
    <div className="flex-1 relative">
      <div className="flex items-center justify-between">
        <h4 className="uppercase text-lg font-medium text-gray-700">
          Top tour booked
        </h4>
        <div className="p-2 bg-white rounded-md gap-2 flex items-center">
          <button
            className={`p-1 ${
              Number(limit) === 3 ? 'bg-primary text-white' : ''
            } rounded-md min-w-[80px] uppercase font-medium`}
            onClick={() => handler(3)}
          >
            top 3
          </button>
          <button
            className={`p-1 ${
              Number(limit) === 5 ? 'bg-primary text-white' : ''
            } rounded-md min-w-[80px] uppercase font-medium`}
            onClick={() => handler(5)}
          >
            top 5
          </button>
          <button
            className={`p-1 ${
              Number(limit) === 7 ? 'bg-primary text-white' : ''
            } rounded-md min-w-[80px] uppercase font-medium`}
            onClick={() => handler(7)}
          >
            top 7
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-2 overflow-auto max-h-[480px]">
        {!isLoading &&
          topBookedData?.length &&
          topBookedData.map((booking, index) => (
            <div
              key={`${booking.tourId}_${index}`}
              className="p-2 bg-white flex flex-col items-center border border-gray-200 rounded-lg md:flex-row md:max-w-xl hover:bg-gray-100"
            >
              <img
                className="mr-3 object-cover w-[200px] rounded-lg h-32"
                src={`${import.meta.env.VITE_IMG_URL}/tours/${booking.photo}`}
                alt={booking.tourName}
              />
              <div className="flex flex-col justify-between leading-normal">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-500">
                  {booking.tourName}
                </h5>
                <span className="mb-3 font-bold text-green-600 capitalize">
                  {booking.bookedCount} booked
                </span>
                <span className="mb-3 font-bold text-gray-700 capitalize">
                  {formatCurrency(booking.tourPrice)}
                </span>
              </div>
            </div>
          ))}
        {isLoading && <Spinner center />}
      </div>
    </div>
  );
}
