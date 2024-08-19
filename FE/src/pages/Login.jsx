import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const closeModal = () => {
    navigate(-1); // Geht zurück zur vorherigen Seite, ohne das Modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl mb-6 text-center font-bold">Login</h2>
        <form onSubmit>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded font-semibold transition duration-200"
            >
              Login
            </button>
            <div className="flex items-center">
              <Link
                to="/signup"
                className="text-indigo-400 hover:text-indigo-300 mr-2 text-sm font-medium"
              >
                Need Account ?
              </Link>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-semibold transition duration-200"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
        <button
          onClick={closeModal}
          className="mt-4 text-gray-400 hover:text-gray-300 text-sm transition duration-200"
        >
          Schließen
        </button>
      </div>
    </div>
  );
};

export default Login;
