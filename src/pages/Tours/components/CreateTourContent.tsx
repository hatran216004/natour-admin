import 'react-day-picker/dist/style.css';
import { useEffect, useMemo, useState } from 'react';
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
import Map from '../../../components/Map';
import useGuides from '../../../features/tour/useGuides';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tourApi } from '../../../services/tour.api';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

type FormData = TourSchema;
const defaultPosition: [number, number] = [10.8231, 106.6297];

export default function CreateTourContent({
  onCloseModal
}: {
  onCloseModal?: () => void;
}) {
  const queryClient = useQueryClient();
  const [isSecret, setIsSecret] = useState(false);
  const { guides } = useGuides();
  const { mutate, isPending } = useMutation({
    mutationFn: tourApi.createNewTour
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
    resolver: yupResolver(tourSchema),
    defaultValues: {
      startDates: [{ date: new Date(), participants: 1 }],
      guides: guideOpts[0]?.value,
      difficulty: difficultyOpts[0].value
    }
  });
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'startDates'
  });

  useEffect(() => {
    setValue('guides', guideOpts?.[0]?.value);
  }, [guides, setValue, guideOpts]);

  function handleAddStartDay(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    append({ date: new Date(), participants: 1 });
  }

  function onSubmit(data: FormData) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('duration', data.duration);
    formData.append('maxGroupSize', data.maxGroupSize);
    formData.append('difficulty', data.difficulty);
    formData.append('summary', data.summary);

    formData.append('imageCover', (data.imageCover as FileList)[0]);

    if (data.images) {
      Array.from(data.images as FileList).forEach((file) => {
        formData.append('images', file);
      });
    }
    formData.append('guides', JSON.stringify([data.guides]));
    formData.append('startDates', JSON.stringify(data.startDates));
    formData.append('startLocation', JSON.stringify(data.startLocation));

    mutate(formData, {
      onSuccess: (data) => {
        const tour = data.data.data.tour;
        queryClient.invalidateQueries({
          queryKey: ['tours']
        });
        toast.success(`Tour ${tour.name} created successfully`);
        reset();
        onCloseModal?.();
      },
      onError: (err) => {
        const axiosError = err as AxiosError<{ message: string }>;
        const errorMessage = axiosError.response?.data?.message as string;
        toast.error(errorMessage);
      }
    });
  }

  return (
    <div className="relative bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Create new tour</h3>
        <button
          title="Close"
          onClick={() => onCloseModal?.()}
          className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
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
              <Row key={field.id} align="start">
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
                label="coordinates"
                name={`startLocation.coordinates`}
                inputSize="md"
                roundedFull={false}
                className="rounded-md w-full"
                register={register}
                readOnly
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
            </Row>
          </div>
          <Map setValue={setValue} initialPosition={defaultPosition} />

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
