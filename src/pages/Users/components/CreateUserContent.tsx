import { useForm } from 'react-hook-form';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { type Schema, schema } from '../../../utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../../../services/user.api';
import Select from '../../../components/Select';
import Row from '../../../components/Row';
import { Role } from '../../../types/role.type';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { AxiosError } from 'axios';

type FormData = Pick<
  Schema,
  'email' | 'password' | 'password_confirm' | 'name' | 'role'
>;
const createUserShema = schema.pick([
  'email',
  'password',
  'password_confirm',
  'name',
  'role'
]);

export default function CreateUserContent({
  roles,
  onCloseModal
}: {
  roles: Role[];
  onCloseModal?: () => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(createUserShema),
    defaultValues: {
      password: 'test1234',
      password_confirm: 'test1234'
    }
  });

  const queryClient = useQueryClient();
  const { mutate: createNewUser, isPending } = useMutation({
    mutationFn: userApi.createNewUser,
    onSuccess: () => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('page', '1');
      setSearchParams(newSearchParams);

      toast.success('User created succesfully');
      queryClient.invalidateQueries({
        queryKey: ['users']
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
    (data: FormData) => {
      const { email, name, password, password_confirm, role } = data;
      createNewUser({
        email,
        name,
        password,
        passwordConfirm: password_confirm,
        role: role ? role : roles[0]._id
      });
    },
    [createNewUser, roles]
  );

  const rolesOptiones = useMemo(
    () =>
      roles?.map((role) => ({
        label: role.name,
        value: role._id
      })) || [],
    [roles]
  );

  return (
    <div className="relative bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Create new user</h3>
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
            <Input
              label="password"
              name="password"
              variant="md"
              type="password"
              placeholder="Enter password..."
              roundedFull={false}
              className="rounded-md min-w-64"
              register={register}
              errorMessage={errors?.password?.message}
            />
            <Input
              label="password confirm"
              name="password_confirm"
              variant="md"
              type="password"
              placeholder="Enter password confirm..."
              roundedFull={false}
              className="rounded-md min-w-64"
              register={register}
              errorMessage={errors?.password_confirm?.message}
            />
          </Row>
          <Row>
            <Select
              name="role"
              register={register}
              options={rolesOptiones}
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
