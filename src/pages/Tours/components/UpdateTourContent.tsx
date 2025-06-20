import toast from 'react-hot-toast';
import { useEffect, useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { type TourSchema, tourSchema } from '../../../utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import { DayPicker } from 'react-day-picker';
import { SelectOptsType } from '../../../types/utils.type';
import Row from '../../../components/Row';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Textarea from '../../../components/Textarea';
import ToggleButton from '../../../components/ToggleButton';
import InputFile from '../../../components/InputFile';
import Popover from '../../../components/Popover';
import Select from '../../../components/Select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tourApi } from '../../../services/tour.api';
import http from '../../../utils/http';
import useGuides from '../hooks/useGuides';
import useTour from '../hooks/useTour';

type FormData = TourSchema;

export default function CreateTourContent({
  tourId,
  onCloseModal
}: {
  tourId: string;
  onCloseModal?: () => void;
}) {
  const { tour } = useTour(tourId);
  const { guides } = useGuides();

  const queryClient = useQueryClient();
  const [isSecret, setIsSecret] = useState(false);

  const { mutate, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: ({ body, id }: { body: any; id: string }) =>
      tourApi.updateTour({ body, id })
  });

  const difficultyOpts: SelectOptsType[] = [
    { label: 'difficult', value: 'difficult' },
    {
      label: 'medium',
      value: 'medium'
    },
    {
      label: 'easy',
      value: 'easy'
    }
  ];
  const guideOpts: SelectOptsType[] = useMemo(
    () =>
      guides?.map((guide) => ({
        label: guide.name,
        value: guide._id
      })) || [],
    [guides]
  );

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(tourSchema)
  });

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'startDates'
  });

  useEffect(() => {
    if (tour) {
      reset({
        ...tour,
        guides: tour.guides?.[0]?._id ?? ''
      });
    }
  }, [tour, reset]);

  function handleAddStartDay(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    append({ date: new Date(), participants: 1 });
  }

  function onSubmit(data: FormData) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price.toString());
    formData.append('duration', data.duration.toString());
    formData.append('maxGroupSize', data.maxGroupSize.toString());
    formData.append('difficulty', data.difficulty);
    formData.append('summary', data.summary);
    formData.append('imageCover', (data.imageCover as FileList)[0]);

    if (data.images) {
      Array.from(data.images as FileList).forEach((file) => {
        formData.append('images', file);
      });
    }
    if (isSecret) {
      formData.append('secret', JSON.stringify(isSecret));
    }

    formData.append('guides', data.guides);
    formData.append('startDates', JSON.stringify(data.startDates));
    formData.append('startLocation', JSON.stringify(data.startLocation));
    mutate(
      { body: formData, id: tourId },
      {
        onSuccess: (data) => {
          const tour = data.data.data.tour;
          queryClient.invalidateQueries({
            queryKey: ['tours']
          });
          toast.success(`Tour ${tour.name} updated successfully`);
          reset();
          onCloseModal?.();
        },
        onError: (err) => {
          console.log(err);
          const axiosError = err as AxiosError<{ message: string }>;
          const errorMessage = axiosError.response?.data?.message as string;
          toast.error(errorMessage);
        }
      }
    );
  }

  async function handleFetchCoordinates(
    e: React.FocusEvent<HTMLInputElement, Element>
  ) {
    try {
      const query = encodeURIComponent(e.target.value);
      const res = await http(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`
      );
      const data = res.data;
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setValue('startLocation.coordinates', [lon, lat]);
      } else {
        throw new Error('Address invalid');
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <div className="relative bg-white">
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Update tour</h3>
      </div>
      <div className="p-4 md:p-5">
        <form
          className="space-y-4 overflow-y-auto max-h-[500px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Row>
            <Input
              label="name"
              name="name"
              inputSize="md"
              type="text"
              roundedFull={false}
              placeholder="Enter tour name..."
              className="rounded-md"
              register={register}
              errorMessage={errors?.name?.message}
            />
            <Input
              type="number"
              label="price"
              name="price"
              inputSize="md"
              roundedFull={false}
              placeholder="Enter price..."
              className="rounded-md"
              register={register}
              errorMessage={errors?.price?.message}
            />
            <Input
              type="number"
              label="duration"
              name="duration"
              inputSize="md"
              placeholder="Enter duration..."
              roundedFull={false}
              className="rounded-md"
              register={register}
              errorMessage={errors?.duration?.message}
            />
            <Input
              type="number"
              label="max group size"
              name="maxGroupSize"
              inputSize="md"
              placeholder="Enter max group size..."
              roundedFull={false}
              className="rounded-md"
              register={register}
              errorMessage={errors?.maxGroupSize?.message}
            />
          </Row>
          <Row align="start">
            <div className="flex-1">
              <label className="text-sm text-[#2D3748] font-normal capitalize mb-[6px] block">
                Difficulty
              </label>
              <Select
                className="w-full"
                options={difficultyOpts}
                name="difficulty"
                register={register}
                errorMessage={errors.difficulty?.message}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-[#2D3748] font-normal capitalize mb-[6px] block">
                Guides
              </label>
              <Select
                className="w-full"
                options={guideOpts}
                name="guides"
                register={register}
                errorMessage={errors.guides?.message}
              />
            </div>
          </Row>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Start Dates
            </label>
            {fields.map((field, index) => (
              <Row key={field.id} align="end">
                <div className="relative">
                  <Input
                    type="number"
                    label="participants"
                    name={`startDates.${index}.participants`}
                    inputSize="md"
                    placeholder="Enter participants..."
                    roundedFull={false}
                    className="rounded-md w-full"
                    register={register}
                    errorMessage={
                      errors?.startDates?.[index]?.participants?.message
                    }
                  />
                </div>

                <Controller
                  control={control}
                  name={`startDates.${index}.date`}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Popover
                        placement="bottom-center"
                        renderPopover={
                          <div onClick={(e) => e.stopPropagation()}>
                            <DayPicker
                              selected={value}
                              onSelect={onChange}
                              mode="single"
                              fromDate={new Date()}
                              className="shadow-xl p-4 text-gray-700 bg-white rounded-lg font-bold text-sm"
                              classNames={{
                                day: 'text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition duration-200 rounded-lg cursor-pointer'
                              }}
                            />
                          </div>
                        }
                      >
                        <Input
                          type="text"
                          label="start date"
                          inputSize="md"
                          placeholder="Select date..."
                          roundedFull={false}
                          className="rounded-md cursor-pointer"
                          value={
                            value ? new Date(value).toLocaleDateString() : ''
                          }
                          errorMessage={
                            errors.startDates?.[index]?.date?.message
                          }
                          readOnly
                        />
                      </Popover>
                    );
                  }}
                />

                {index > 0 && (
                  <Button
                    size="sm"
                    onClick={() => remove(index)}
                    className="bg-red-500 hover:bg-red-600 text-white h-10"
                  >
                    Remove
                  </Button>
                )}
              </Row>
            ))}
          </div>
          <Button size="md" onClick={handleAddStartDay}>
            Add Start Date
          </Button>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Start location
            </label>
            <Row>
              <Input
                onBlur={handleFetchCoordinates}
                label="address"
                name={`startLocation.address`}
                inputSize="md"
                placeholder="Enter address..."
                roundedFull={false}
                className="rounded-md w-full"
                register={register}
                errorMessage={errors?.startLocation?.address?.message}
              />
              <Input
                label="description"
                name={`startLocation.description`}
                inputSize="md"
                placeholder="Description..."
                roundedFull={false}
                className="rounded-md w-full"
                register={register}
              />
              <Input
                label="coordinates"
                name={`startLocation.coordinates`}
                inputSize="md"
                roundedFull={false}
                className="rounded-md w-full"
                register={register}
                readOnly
              />
            </Row>
          </div>

          <Textarea
            name="summary"
            register={register}
            placeholder="Write summary here..."
            errorMessage={errors.summary?.message}
          />
          <Row>
            <InputFile
              name="imageCover"
              errorMessage={errors.imageCover?.message}
              label="image cover"
              register={register}
            />
            <InputFile
              name="images"
              register={register}
              errorMessage={errors.images?.message}
              label="images file"
              multiple
            />
          </Row>
          <ToggleButton
            label="Secret tour"
            checked={isSecret}
            onChecked={setIsSecret}
          />
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
