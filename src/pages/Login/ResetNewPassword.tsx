import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { userSchema, UserSchema } from '../../utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
// import toast from 'react-hot-toast';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../../services/auth.api';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

type FormData = Pick<UserSchema, 'password' | 'password_confirm'>;
const resetPasswordSchema = userSchema.pick(['password', 'password_confirm']);

export default function ResetNewPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const { mutate, isPending } = useMutation({
    mutationFn: authApi.resetPassword
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(resetPasswordSchema)
  });

  const onSubmit = ({ password, password_confirm }: FormData) => {
    if (!token) return;

    mutate(
      { token, password, passwordConfirm: password_confirm },
      {
        onSuccess: () => {
          toast.success('Password reset successfully');
          navigate('/login');
        },
        onError: (error) => {
          const message = (error as AxiosError<{ message: string }>).response
            ?.data.message;
          toast.error(message || 'Token invalid or has expired');
        }
      }
    );
  };

  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-[30%] max-w-[452px] text-red p-12 rounded-2xl bg-white shadow-custom">
      <h2 className="text-lg text-[#2D3748] text-center font-bold">
        Forgot password
      </h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Input
          label="password"
          type="password"
          placeholder="New password"
          name="password"
          register={register}
          errorMessage={errors?.password?.message}
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="Confirm password"
          name="password_confirm"
          register={register}
          errorMessage={errors?.password_confirm?.message}
        />
        <Button type="submit" isLoading={isPending}>
          Submit
        </Button>
      </form>
      <Link
        to="/login"
        className="absolute top-3 left-4 group text-left text-sm text-primary inline-flex items-center gap-2"
      >
        <FaArrowLeftLong className="mt-1 group-hover:-translate-x-1 transition-transform duration-300" />{' '}
        Back to login
      </Link>
    </div>
  );
}
