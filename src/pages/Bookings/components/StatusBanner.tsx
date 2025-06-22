import classNames from 'classnames';
import { Booking } from '../../../types/booking.type';
import { formatDate } from '../../../utils/helpers';

const statusColors = {
  confirmed: {
    border: 'border-green-200 from-green-50 to-emerald-50',
    bg: 'bg-green-100',
    text: 'text-green-800',
    subtext: 'text-green-600',
    badge: 'text-green-800 bg-green-100'
  },
  pending: {
    border: 'border-yellow-200 from-yellow-50 to-yellow-50',
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    subtext: 'text-yellow-600',
    badge: 'text-yellow-800 bg-yellow-100'
  },
  failed: {
    border: 'border-red-200 from-red-50 to-red-50',
    bg: 'bg-red-100',
    text: 'text-red-800',
    subtext: 'text-red-600',
    badge: 'text-red-800 bg-red-100'
  }
};

export default function StatusBanner({
  status,
  updatedAt
}: {
  status: Booking['status'];
  updatedAt: string;
}) {
  const cssStatus = statusColors[status];

  return (
    <div
      className={classNames(
        'bg-gradient-to-r border rounded-xl p-6 mb-8',
        cssStatus.border
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className={classNames('p-3 rounded-full mr-4', cssStatus.bg)}
          ></div>
          <div>
            <h3
              className={classNames(
                'text-lg font-semibold uppercase',
                cssStatus.text
              )}
            >
              Booking {status}
            </h3>
            <p className={cssStatus.subtext}>
              Customer has paid in full • Last updated:{' '}
              {formatDate(updatedAt, true)}
            </p>
          </div>
        </div>
        <span
          className={classNames(
            ' px-4 py-2 rounded-full text-sm font-medium uppercase',
            cssStatus.text,
            cssStatus.bg
          )}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
