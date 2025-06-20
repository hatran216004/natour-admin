import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { userSchema, UserSchema } from '../../utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';

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

  const onSubmit = (data: FormData) => {
    console.log(data);
    toast.success(
      'If the email you entered exists, we have sent a password reset link. Please check your gmail'
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
          label="email"
          type="email"
          placeholder="Your email"
          name="email"
          register={register}
          defaultValue="admin@gmail.com"
          errorMessage={errors?.email?.message}
        />

        <Button type="submit" isLoading={false}>
          Submit
        </Button>
      </form>
    </div>
  );
}
