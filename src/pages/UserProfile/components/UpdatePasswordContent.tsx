import { yupResolver } from '@hookform/resolvers/yup';
import {
  updatePasswordSchema,
  type UpdatePasswordSchema
} from '../../../utils/rules';
import { useForm } from 'react-hook-form';
import { authApi } from '../../../services/auth.api';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { ErrorResponseApi } from '../../../types/utils.type';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

export default function UpdatePasswordContent() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdatePasswordSchema>({
    resolver: yupResolver(updatePasswordSchema)
  });

  const { mutate, isPending } = useMutation({
    mutationFn: authApi.updatePassword
  });

  const onSubmit = (data: UpdatePasswordSchema) => {
    const { currentPassword, newPassword, passwordConfirm } = data;
    if (!currentPassword || !newPassword || !passwordConfirm) return;

    mutate(
      {
        currentPassword,
        newPassword,
        passwordConfirm
      },
      {
        onSuccess: () => {
          toast.success('Password update successfully');
        },
        onError: (errors) => {
          const errMessage = (errors as AxiosError<ErrorResponseApi>).response
            ?.data.message;
          toast.error(
            errMessage || 'Something went wrong. Please try again later!'
          );
        }
      }
    );
  };

  return (
    <div className="relative bg-white">
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Update password</h3>
      </div>
      <div className="p-4 md:p-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Current password"
            name="currentPassword"
            inputSize="md"
            type="password"
            roundedFull={false}
            placeholder="Enter..."
            className="rounded-md"
            register={register}
            errorMessage={errors?.currentPassword?.message}
          />
          <Input
            label="New password"
            name="newPassword"
            inputSize="md"
            type="password"
            roundedFull={false}
            placeholder="Enter..."
            className="rounded-md"
            register={register}
            errorMessage={errors?.newPassword?.message}
          />
          <Input
            label="New password confirm"
            name="passwordConfirm"
            inputSize="md"
            type="password"
            roundedFull={false}
            placeholder="Enter..."
            className="rounded-md"
            register={register}
            errorMessage={errors?.passwordConfirm?.message}
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
