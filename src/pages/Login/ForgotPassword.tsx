import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { userSchema, UserSchema } from '../../utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../../services/auth.api';
import { AxiosError } from 'axios';

type FormData = Pick<UserSchema, 'email'>;
const forgotPasswordSchema = userSchema.pick(['email']);

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(forgotPasswordSchema)
  });
  const { mutate, isPending } = useMutation({
    mutationFn: authApi.forgotPassowrd
  });

  const onSubmit = ({ email }: FormData) => {
    mutate(email, {
      onSuccess: () => {
        toast.success(
          'If the email you entered exists, we have sent a password reset link. Please check your gmail'
        );
      },
      onError: (error) => {
        const message = (error as AxiosError<{ message: string }>).response
          ?.data.message;
        toast.error(
          message || 'There was an error sending the email. Try again later!'
        );
      }
    });
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
          label="email"
          type="email"
          placeholder="Your email"
          name="email"
          register={register}
          defaultValue="minhhatran153@gmail.com"
          errorMessage={errors?.email?.message}
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
