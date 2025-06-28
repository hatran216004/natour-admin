import { useForm } from 'react-hook-form';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { bookingSchema, BookingSchema } from '../../../utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Select from '../../../components/Select';
import Row from '../../../components/Row';
import toast from 'react-hot-toast';
import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { SelectOptsType } from '../../../types/utils.type';
import { Booking } from '../../../types/booking.type';
import { bookingApi } from '../../../services/booking.api';

type FormData = Pick<
  BookingSchema,
  'participants' | 'special_requirements' | 'status'
>;
const updateBookingSchema = bookingSchema.pick([
  'participants',
  'special_requirements',
  'status'
]);

export default function UpdateBookingContent({
  booking,
  statusOpts,
  onCloseModal
}: {
  booking: Booking;
  statusOpts: SelectOptsType[];
  onCloseModal?: () => void;
}) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(updateBookingSchema),
    defaultValues: {
      status: booking.paymentStatus,
      participants: booking.participants,
      special_requirements: booking.specialRequirements
    }
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: bookingApi.updateBooking,
    onSuccess: () => {
      toast.success('Booking updated succesfully');
      queryClient.invalidateQueries({
        queryKey: ['bookings']
      });

      reset();
      onCloseModal?.();
    },
    onError: (err) => {
      const errorMessage = (err as AxiosError<{ message: string }>).response
        ?.data?.message;
      toast.error(errorMessage || 'An error occurred');
    }
  });

  const onSubmit = useCallback(
    ({ participants, status, special_requirements }: FormData) => {
      mutate({
        id: booking._id,
        body: {
          participants,
          status,
          specialRequirements: special_requirements ? special_requirements : ''
        }
      });
    },
    [mutate, booking]
  );

  return (
    <div className="relative bg-white">
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Update booking</h3>
      </div>
      <div className="p-4 md:p-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Input
              label="participants"
              name="participants"
              inputSize="md"
              type="text"
              roundedFull={false}
              className="rounded-md"
              register={register}
              errorMessage={errors?.participants?.message}
            />
            <Input
              label="Special requirements"
              name="special_requirements"
              inputSize="md"
              type="text"
              roundedFull={false}
              className="rounded-md"
              register={register}
              errorMessage={errors?.special_requirements?.message}
            />
          </Row>
          <Row>
            <div>
              <label className="text-sm text-[#2D3748] font-normal capitalize mb-[6px] block">
                Payment status
              </label>
              <Select
                name="status"
                register={register}
                options={statusOpts}
                className="w-32"
              />
            </div>
          </Row>
          <Button
            className="w-full capitalize text-[16px]"
            isLoading={isPending}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
