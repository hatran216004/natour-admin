import { CiHome } from 'react-icons/ci';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-green-400 mb-4">404</h1>
          <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
        </div>

        {/* Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Page not found
          </h2>
          <p className="text-gray-600 mb-6">
            Sorry, the page you are looking for does not exist or has been
            moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-green-400 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <CiHome className="w-5 h-5" />
            Go home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaArrowLeft className="w-5 h-5" />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
