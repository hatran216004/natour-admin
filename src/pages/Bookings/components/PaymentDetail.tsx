import classNames from 'classnames';
import { formatCurrency, formatDate } from '../../../utils/helpers';
import { Booking } from '../../../types/booking.type';

const statusCss = {
  confirmed: {
    bg: 'bg-green-50',
    subtext: 'text-green-600',
    text: 'text-green-800',
    mediumText: 'text-green-700'
  },
  failed: {
    bg: 'bg-red-50',
    subtext: 'text-red-600',
    text: 'text-red-800',
    mediumText: 'text-red-700'
  },
  pending: {
    bg: 'bg-yellow-50',
    subtext: 'text-yellow-600',
    text: 'text-yellow-800',
    mediumText: 'text-yellow-700'
  }
};

export default function PaymentDetail({ booking }: { booking: Booking }) {
  const paymentPaidStatus =
    booking?.status === 'confirmed' ? 'Paid in full' : 'Not paid in full';

  const cssStatus = statusCss[booking.status];

  return (
    <>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-600">Tour price</span>
            <span className="font-medium">
              {formatCurrency(booking.tour.price)}
            </span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-600">
              Participant{booking.participants > 1 && 's'}
            </span>
            <span className="font-medium">{booking.participants}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-600">Service fee</span>
            <span className="font-medium">0₫</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-600">Travel insurance</span>
            <span className="font-medium">0₫</span>
          </div>
          <div className="flex justify-between items-center pt-3">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-xl font-bold text-gray-800">
              {formatCurrency(booking.price)}
            </span>
          </div>
        </div>
        <div className={classNames('mt-6 p-4 rounded-lg', cssStatus.bg)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i
                className={classNames(
                  'fas fa-check-circle mr-2',
                  cssStatus.subtext
                )}
              />
              <span
                className={classNames('font-medium uppercase', cssStatus.text)}
              >
                {paymentPaidStatus}
              </span>
            </div>
            <span className={classNames('text-sm', cssStatus.subtext)}>
              {formatDate(booking.createdAt, true)}
            </span>
          </div>
          <div className={classNames('mt-2 text-sm', cssStatus.mediumText)}>
            • Payment method:{' '}
            <span className="capitalize">{booking.paymentMethod}</span>
            <p>
              • Payment id:{' '}
              {booking.transactionId
                ? booking.transactionId
                : booking.paymentId}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
