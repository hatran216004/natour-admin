import { useQuery } from '@tanstack/react-query';
import Heading from '../../components/Heading';
import Main from '../../components/Main';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import { bookingApi } from '../../services/booking.api';
import { Booking } from '../../types/booking.type';
import BookingRow from './components/BookingRow';
import Pagination from '../../components/Pagination';

export default function Bookings() {
  const { isLoading, data } = useQuery({
    queryKey: ['bookings'],
    queryFn: bookingApi.getAllBookings
  });

  return (
    <Main>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Heading heading="manage bookings" />
        </div>
        {/* <UserOperator rolesOpts={rolesOpts} /> */}
      </div>
      {isLoading && <Spinner size="lg" center={true} />}
      {!isLoading && (
        <>
          <div className="overflow-y-auto flex-1">
            <Table>
              <Table.Header className="text-nowrap">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center ">
                    tour
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    user
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    price
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    participants
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    status
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Payment method
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Special requirements
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Start date
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Created at
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Updated at
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Actions
                  </th>
                </tr>
              </Table.Header>
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
