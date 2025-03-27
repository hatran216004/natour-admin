import { Link } from 'react-router-dom';
import Input from '../../components/Input';

export default function Signup() {
  return (
    <div className="flex-1 center">
      <div className="max-w-[452px] text-red p-12 rounded-2xl bg-white shadow-custom">
        <h2 className="text-lg text-[#2D3748] text-center font-bold">
          Register
        </h2>
        <form className="flex flex-col gap-6">
          <Input label="name" type="text" placeholder="Your full name" />
          <Input label="email" type="email" placeholder="Your email" />
          <Input label="password" type="password" placeholder="Your password" />
          <Input
            label="confirm password"
            type="password"
            placeholder="Your confirm password"
          />
          <button className="bg-primary rounded-xl text-center h-[45px] text-white uppercase font-bold text-sm hover:opacity-90">
            SIGN UP
          </button>
          <p className="text-sm text-[#A0AEC0] text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
