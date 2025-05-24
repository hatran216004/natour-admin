import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    <div className="bg-[#F8F9FA] h-screen">
      <div className="container mx-auto h-full">
        <div className="py-4 grid items-start grid-cols-12 gap-4 h-full">
          <Sidebar />
          <div className="col-span-9 flex flex-col h-full">
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
