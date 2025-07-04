import { useQuery } from '@tanstack/react-query';
import Heading from '../../components/Heading';
import Main from '../../components/Main';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import { bookingApi } from '../../services/booking.api';
import { Booking, BookingListConfig } from '../../types/booking.type';
import BookingRow from './components/BookingRow';
import Pagination from '../../components/Pagination';
import FilterSelect from '../../components/FilterSelect';
import useQueryParms from '../../hooks/useQueryParms';
import { isUndefined, omitBy } from 'lodash';

export default function Bookings() {
  const queryParams = useQueryParms<BookingListConfig>();
  const queryConfig: BookingListConfig = omitBy(
    {
      paymentStatus: queryParams.paymentStatus
    },
    isUndefined
  );

  const { isLoading, data } = useQuery({
    queryKey: ['bookings', queryConfig],
    queryFn: () => bookingApi.getAllBookings(queryConfig)
  });

  return (
    <Main>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Heading heading="manage bookings" />
        </div>
        <div className="flex items-center gap-8">
          <FilterSelect
            label="status"
            options={[
              {
                label: 'Paid',
                value: 'Paid'
              },
              {
                label: 'Unpaid',
                value: 'Unpaid'
              },
              {
                label: 'Cancelled',
                value: 'Cancelled'
              },
              {
                label: 'Failed',
                value: 'Failed'
              },
              {
                label: 'Refunded',
                value: 'Refunded'
              }
            ]}
            field="paymentStatus"
          />
        </div>
      </div>
      {isLoading && <Spinner size="lg" center={true} />}
      {!isLoading && (
        <>
          <div className="overflow-y-auto flex-1">
            <Table>
              <Table.Header
                data={[
                  'tour',
                  'user',
                  'amount',
                  'participants',
                  'status',
                  'payment method',
                  'Special requirements',
                  'Start date',
                  'created at',
                  'updated at',
                  'actions'
                ]}
              />

              <Table.Body
                data={data?.data.data.bookings}
                render={(booking: Booking) => (
                  <BookingRow key={booking._id} booking={booking} />
                )}
              />
            </Table>
          </div>
          <Pagination
            className="ml-auto mt-auto mb-[-12px]"
            totalPages={data?.data.data.pagination.totalPages as number}
          />
        </>
      )}
    </Main>
  );
}
