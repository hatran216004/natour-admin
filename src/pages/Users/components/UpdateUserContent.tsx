import { useForm } from 'react-hook-form';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { type Schema, schema } from '../../../utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../../../services/user.api';
import Select from '../../../components/Select';
import Row from '../../../components/Row';
import toast from 'react-hot-toast';
import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { SelectOptsType } from '../../../types/utils.type';
import { User } from '../../../types/user.type';

type FormData = Pick<Schema, 'email' | 'name' | 'role'>;
const updateUserSchema = schema.pick(['email', 'name', 'role']);

export default function UpdateUserContent({
  user,
  rolesOpts,
  onCloseModal
}: {
  user: User;
  rolesOpts: SelectOptsType[];
  onCloseModal?: () => void;
}) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(updateUserSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
      role: user.role?._id
    }
  });

  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: userApi.updateUser,
    onSuccess: (data) => {
      const user = data.data.data.user;
      toast.success('User updated succesfully');
      queryClient.invalidateQueries({
        queryKey: ['users']
      });
      reset({
        email: user.email,
        name: user.name,
        role: user.role?._id
      });
      onCloseModal?.();
    },
    onError: (err) => {
      const errorMessage = (err as AxiosError<{ message: string }>).response
        ?.data?.message;
      toast.error(errorMessage || 'An error occurred');
    }
  });

  const onSubmit = useCallback(
    (data: FormData) => {
      updateUser({
        userId: user._id,
        body: { ...data, role: data.role as string }
      });
    },
    [updateUser, user]
  );

  return (
    <div className="relative bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Update user</h3>
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
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Input
              label="name"
              name="name"
              variant="md"
              type="text"
              roundedFull={false}
              placeholder="Enter userame..."
              className="rounded-md min-w-64"
              register={register}
              errorMessage={errors?.name?.message}
            />
            <Input
              label="email"
              name="email"
              variant="md"
              type="email"
              roundedFull={false}
              placeholder="Enter email..."
              className="rounded-md min-w-64"
              register={register}
              errorMessage={errors?.email?.message}
            />
          </Row>
          <Row>
            <Select
              name="role"
              register={register}
              options={rolesOpts}
              className="w-32"
            />
          </Row>
          <Button
            className="bg-blue-400 w-full capitalize text-[16px] ml-auto"
            isLoading={isPending}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
