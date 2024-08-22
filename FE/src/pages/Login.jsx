import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast }  from 'react-toastify';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const Login = () => {

  return (
    <div className='flex justify-center items-center min-h-screen bg-background-900'>
      <div className="w-96 h-auto bg-accent-950 rounded-lg text-white p-8 absolute top-40 left-1/2 transform -translate-x-1/2 mt-10">
        <form action="">
          <h1 className="text-3xl text-center mb-8">Login</h1>

          <div className="relative w-full h-12 mb-8">
            <input
              type="text"
              placeholder="Username"
              required
              className="w-full h-full bg-transparent outline-none border-2 border-white/10 rounded-full text-base text-white py-3 pl-5 pr-12 placeholder-white"
            />
            <FaUser className='absolute right-5 top-1/2 transform -translate-y-1/2 text-lg' />
          </div>

          <div className="relative w-full h-12 mb-8">
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full h-full bg-transparent outline-none border-2 border-white/10 rounded-full text-base text-white py-3 pl-5 pr-12 placeholder-white"
            />
            <FaLock className='absolute right-5 top-1/2 transform -translate-y-1/2 text-lg' />
          </div>

          <div className="flex justify-between text-sm mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="accent-white mr-2" />
              Remember me
            </label>
            <a href="#" className="text-white hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-primary-500 border-none outline-none rounded-full shadow-lg cursor-pointer text-base text-gray-800"
          >
            Login
          </button>

          <div className="text-sm text-center mt-5">
            <p>Don't have an account? <Link to="/signup" className="text-white font-semibold hover:underline">Sign Up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;