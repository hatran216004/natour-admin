import { formatDate } from '../../../utils/helpers';

export default function BookingHistory({
  createdAt,
  updatedAt,
  paymentTime
}: {
  createdAt: string;
  updatedAt: string;
  paymentTime: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-start">
        <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
          <i className="fas fa-check text-blue-600 text-xs" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-900">Booking created at</p>
          <p className="text-sm text-gray-500">{formatDate(createdAt, true)}</p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-yellow-100 p-2 rounded-full mr-3 mt-1">
          <i className="fas fa-check text-yellow-600 text-xs" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-900">Booking updated at</p>
          <p className="text-sm text-gray-500">{formatDate(updatedAt, true)}</p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
          <i className="fas fa-check text-green-600 text-xs" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-900">Booking paid at</p>
          <p className="text-sm text-gray-500">
            {formatDate(paymentTime, true)}
          </p>
        </div>
      </div>
    </div>
  );
}
