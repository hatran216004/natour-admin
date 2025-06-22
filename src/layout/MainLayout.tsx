import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    <div className="bg-[#F8F9FA] h-screen">
      <div className="container mx-auto h-full">
        <div className="py-4 grid items-start grid-cols-12 gap-4 h-full">
          <div className="sm:hidden lg:block lg:col-span-3 h-full bg-white rounded-xl shadow-custom">
            <Sidebar />
          </div>
          <div className="col-span-12 lg:col-span-9 flex flex-col h-full overflow-auto relative">
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
