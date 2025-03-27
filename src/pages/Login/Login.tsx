import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 center">
      <div className="max-w-[452px] text-red p-12 rounded-2xl bg-white shadow-custom">
        <h2 className="text-lg text-[#2D3748] text-center font-bold">Login</h2>
        <form className="flex flex-col gap-6">
          <Input label="email" type="email" placeholder="Your email" />
          <Input label="password" type="password" placeholder="Your password" />
          <button
            onClick={() => navigate('/')}
            className="bg-primary rounded-xl text-center h-[45px] text-white uppercase font-bold text-sm hover:opacity-90"
          >
            login
          </button>
          <p className="text-sm text-[#A0AEC0] text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
