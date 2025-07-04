import { useForm } from 'react-hook-form';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { type UserSchema, userSchema } from '../../../utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { userApi } from '../../../services/user.api';
import Row from '../../../components/Row';
import toast from 'react-hot-toast';
import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { useAuthStore } from '../../../store/auth.store';

type FormData = Pick<UserSchema, 'email' | 'name'>;
const updateUserSchema = userSchema.pick(['email', 'name']);

export default function UpdateMeContent({
  onCloseModal
}: {
  onCloseModal?: () => void;
}) {
  const { user, setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(updateUserSchema),
    defaultValues: {
      email: user?.email,
      name: user?.name
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: userApi.updateMe,
    onSuccess: (data) => {
      const user = data.data.data.user;
      toast.success('User updated succesfully');

      setUser(user);

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
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('name', data.name);
      mutate(formData);
    },
    [mutate]
  );

  return (
    <div className="relative bg-white">
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">
          Update your profile
        </h3>
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
