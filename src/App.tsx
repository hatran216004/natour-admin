import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import LoginLayout from './layout/LoginLayout.tsx';
import { Toaster } from 'react-hot-toast';
import MainLayout from './layout/MainLayout.tsx';
import Dashboard from './pages/Dashboard';
import Tours from './pages/Tours/Tours.tsx';
import Bookings from './pages/Bookings/Bookings.tsx';
import Reviews from './pages/Reviews/Reviews.tsx';
import Users from './pages/Users/Users.tsx';
import UserProfile from './pages/UserProfile/UserProfile.tsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tours" element={<Tours />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="users" element={<Users />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
          <Route element={<LoginLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 2000
          },
          error: {
            duration: 3000
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: '#fff',
            color: '#131717'
          }
        }}
      />
    </>
  );
}

export default App;
