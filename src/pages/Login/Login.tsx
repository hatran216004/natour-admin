import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { type UserSchema, userSchema } from '../../utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../../components/Input';
import { authApi } from '../../services/auth.api';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/auth.store';
import Button from '../../components/Button';

type FormData = Pick<UserSchema, 'email' | 'password'>;
const loginSchema = userSchema.pick(['email', 'password']);

export default function Signup() {
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  });

  const { mutate, isPending } = useMutation({
    mutationFn: authApi.login
  });

  function onSubmit(data: FormData) {
    mutate(data, {
      onSuccess: (data) => {
        const user = data.data?.data.user;
        const token = data.data?.token as string;
        setAccessToken(token);
        setUser(user);
        navigate('/');
        toast.success('Login successfully');
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage = axiosError.response?.data?.message as string;
        toast.error(errorMessage);
      }
    });
  }

  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-[30%] max-w-[452px] text-red p-12 rounded-2xl bg-white shadow-custom">
      <h2 className="text-lg text-[#2D3748] text-center font-bold">Login</h2>
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
          defaultValue="admin@gmail.com"
          errorMessage={errors?.email?.message}
        />
        <Input
          label="password"
          type="password"
          placeholder="Your password"
          name="password"
          defaultValue="test1234"
          register={register}
          errorMessage={errors?.password?.message}
        />
        <Link
          to="/forgot-password"
          className="text-right text-sm text-primary hover:underline"
        >
          Forgot password
        </Link>
        <Button type="submit" isLoading={isPending}>
          Login
        </Button>
      </form>
    </div>
  );
}
