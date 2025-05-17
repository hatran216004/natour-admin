import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { userApi } from '../../../services/user.api';
import { SelectOptsType } from '../../../types/utils.type';
import { type UserSchema, userSchema } from '../../../utils/rules';
import Select from '../../../components/Select';
import Row from '../../../components/Row';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

type FormData = Pick<
  UserSchema,
  'email' | 'password' | 'password_confirm' | 'name' | 'role'
>;
const createUserShema = userSchema.pick([
  'email',
  'password',
  'password_confirm',
  'name',
  'role'
]);

export default function CreateUserContent({
  rolesOpts,
  onCloseModal
}: {
  rolesOpts: SelectOptsType[];
  onCloseModal?: () => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(createUserShema)
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
        role: role ? role : rolesOpts[0].value
      });
    },
    [createNewUser, rolesOpts]
  );

  return (
    <div className="relative bg-white">
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Create new user</h3>
      </div>
      <div className="p-4 md:p-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Input
              label="name"
              name="name"
              inputSize="md"
              type="text"
              roundedFull={false}
              placeholder="Enter userame..."
              className="rounded-md"
              register={register}
              errorMessage={errors?.name?.message}
            />
            <Input
              label="email"
              name="email"
              inputSize="md"
              type="email"
              roundedFull={false}
              placeholder="Enter email..."
              className="rounded-md"
              register={register}
              errorMessage={errors?.email?.message}
            />
          </Row>
          <Row>
            <Input
              label="password"
              name="password"
              inputSize="md"
              type="password"
              placeholder="Enter password..."
              roundedFull={false}
              className="rounded-md"
              register={register}
              errorMessage={errors?.password?.message}
            />
            <Input
              label="password confirm"
              name="password_confirm"
              inputSize="md"
              type="password"
              placeholder="Enter password confirm..."
              roundedFull={false}
              className="rounded-md"
              register={register}
              errorMessage={errors?.password_confirm?.message}
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
