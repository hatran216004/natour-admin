import { Outlet } from 'react-router-dom';
import icons from '../assets/icons';

export default function LoginLayout() {
  return (
    <div className="relative p-2 pb-2 flex flex-col h-screen">
      <div className="h-full">
        <div className="bg-primary rounded-2xl p-10 mb-3 h-[520px]">
          <div className="center">
            <div className="center gap-3">
              <img src={icons.logo} alt="Natours" />
              <h2 className="uppercase text-[0.875rem] text-white leading-5 font-bold ">
                natours dashboard
              </h2>
            </div>
            <div className="ml-[112px] center gap-8">
              <div className="center gap-3 p-2">
                <img src={icons.dashboard} alt="Dashboard" />
                <h2 className="uppercase text-xs text-white leading-5 font-bold ">
                  dashboard
                </h2>
              </div>
              <div className="center gap-3 p-2">
                <img src={icons.key} alt="User" />
                <h2 className="uppercase text-xs text-white leading-5 font-bold ">
                  sign in
                </h2>
              </div>
            </div>
          </div>
          <div className="center flex-col mt-8">
            <h3 className="text-white text-3xl font-bold">Welcome!</h3>
            <p className="mt-3 text-lg text-center text-white max-w-[400px]">
              Use these awesome forms to login your account.
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
