import { Link, Outlet } from 'react-router-dom';
import icons from '../assets/icons';

export default function LoginSignupLayout() {
  return (
    <div className="p-2 pb-2 flex flex-col h-screen">
      <div className="flex h-full">
        <div className="bg-primary rounded-2xl p-10 flex-1 mb-3">
          <div className="center flex-col">
            <div className="center gap-3">
              <img src={icons.logo} alt="Natours" />
              <h2 className="uppercase text-[0.875rem] text-white leading-5 font-bold ">
                natours dashboard
              </h2>
            </div>
            <div className="mt-8">
              <div className="center gap-8">
                <Link to="/" className="center gap-3 p-2">
                  <img src={icons.dashboard} alt="Dashboard" />
                  <h2 className="uppercase text-xs text-white leading-5 font-bold ">
                    dashboard
                  </h2>
                </Link>
                <Link to="/" className="center gap-3 p-2">
                  <img src={icons.userCircle} alt="User" />
                  <h2 className="uppercase text-xs text-white leading-5 font-bold ">
                    sign up
                  </h2>
                </Link>
                <Link to="/" className="center gap-3 p-2">
                  <img src={icons.key} alt="User" />
                  <h2 className="uppercase text-xs text-white leading-5 font-bold ">
                    sign in
                  </h2>
                </Link>
              </div>
            </div>
          </div>
          <div className="center flex-col mt-16">
            <h3 className="text-white text-6xl font-bold">Welcome!</h3>
            <p className="mt-3 text-lg text-center text-white max-w-[400px]">
              Use these awesome forms to login or create new account in your
              project for free.
            </p>
          </div>
        </div>
        <Outlet />
      </div>
      <footer className="mt-auto text-center">
        <p className="text-sm text-[#A0AEC0]">
          @ 2025, Made with ❤️ by <span className="text-primary">Hà Trần</span>
        </p>
      </footer>
    </div>
  );
}
