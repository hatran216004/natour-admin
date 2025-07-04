import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { bookingApi } from '../../services/booking.api';
import Spinner from '../../components/Spinner';
import UserListItem from '../../components/UserListItem';
import BookingDetailPanel from './components/BookingDetailPanel';
import BookingTourInfo from './components/BookingTourInfo';
import PaymentDetail from './components/PaymentDetail';
import BookingHistory from './components/BookingHistory';
import StatusBanner from './components/StatusBanner';
import { FaArrowLeft } from 'react-icons/fa';

export default function BookingDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['booking', id],
    queryFn: () => bookingApi.getBooking(id!),
    enabled: !!id
  });

  if (isLoading) return <Spinner center={true} />;
  const booking = data?.data?.data.booking;

  return (
    <>
      {booking && (
        <div className="flex-1 h-full overflow-auto">
          <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-6">
            <div className="max-w-7xl">
              <div className="flex items-center">
                <button
                  onClick={() => navigate(-1)}
                  className="w-8 h-8 text-primary first:hover:opacity-80 rounded-full shadow-md bg-white flex items-center justify-center"
                >
                  <FaArrowLeft />
                </button>
                <div className="flex items-center">
                  <button className="mr-4 text-gray-600 hover:text-gray-900 transition-colors">
                    <i className="fas fa-arrow-left text-lg" />
                  </button>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Booking detail #{booking._id}
                  </h1>
                </div>
              </div>
            </div>
          </header>
          <div className="bg-white shadow-md max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <StatusBanner
              status={booking.paymentStatus}
              updatedAt={booking.updatedAt}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <BookingDetailPanel title="Tour info">
                  <BookingTourInfo booking={booking} />
                </BookingDetailPanel>

                <BookingDetailPanel title="User info">
                  <UserListItem
                    lineClamp={false}
                    email={booking.user.email}
                    name={booking.user.name}
                    photo={booking.user.photo}
                  />
                </BookingDetailPanel>

                <BookingDetailPanel title="Payment detail">
                  <PaymentDetail booking={booking} />
                </BookingDetailPanel>

                {booking.specialRequirements && (
                  <BookingDetailPanel title="Special Requirements">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Customer request:
                      </h4>
                      <div className="space-y-2">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="flex justify-between items-start">
                            <p className="text-blue-800 text-sm">
                              {booking.specialRequirements}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </BookingDetailPanel>
                )}
              </div>
              <div className="space-y-6">
                {/* Quick Actions */}
                <BookingDetailPanel title="Quick actions">
                  <div className="space-y-3">
                    <button className="w-full bg-orange-400 hover:opacity-90 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                      <i className="fas fa-file-pdf mr-2" />
                      Export PDF
                    </button>
                  </div>
                </BookingDetailPanel>

                <BookingDetailPanel title="Booking History">
                  <BookingHistory
                    paymentTime={booking.paymentTime}
                    createdAt={booking.createdAt}
                    updatedAt={booking.updatedAt}
                  />
                </BookingDetailPanel>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
