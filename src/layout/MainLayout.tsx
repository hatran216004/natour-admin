import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    <div className="bg-[#F8F9FA] h-screen">
      <div className="container mx-auto h-full">
        <div className="pt-7 grid items-start grid-cols-12 gap-8 h-full">
          <Sidebar />
          <div className="col-span-9">
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
