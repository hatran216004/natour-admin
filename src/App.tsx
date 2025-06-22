import 'react-day-picker/dist/style.css';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { useAuthStore } from './store/auth.store.ts';
import { routes } from './utils/links.ts';
import Login from './pages/Login';
import LoginLayout from './layout/LoginLayout.tsx';
import MainLayout from './layout/MainLayout.tsx';
import SocketProvider from './context/SocketContext.tsx';
import ForgotPassword from './pages/Login/ForgotPassword.tsx';
import ResetNewPassword from './pages/Login/ResetNewPassword.tsx';
import NotFound from './pages/NotFound';

function ProtectedRoutes() {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function RejectedRoutes() {
  const { isAuthenticated } = useAuthStore();
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route element={<ProtectedRoutes />}>
            <Route element={<MainLayout />}>
              <Route index element={<Navigate replace to="profile" />} />
              {routes.map((route) => {
                const Element = route.element;
                return (
                  <Route
                    path={route.path}
                    element={<Element />}
                    key={route.path}
                  />
                );
              })}
            </Route>
          </Route>
          <Route element={<RejectedRoutes />}>
            <Route element={<LoginLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/forgot-password/:token"
                element={<ResetNewPassword />}
              />
            </Route>
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
    </SocketProvider>
  );
}

export default App;
