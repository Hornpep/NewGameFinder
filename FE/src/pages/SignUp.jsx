import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast }  from 'react-toastify';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import backgroundImage from '../assets/controller-bg-pic.jpg';

const Signup = () => {

  return (
    <div 
      className="flex justify-center items-center min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      <div className="w-96 h-auto bg-black/30 rounded-lg text-white p-8 absolute top-40 left-1/2 transform -translate-x-1/2 mt-10 border-2 border-white/20 backdrop-blur shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <form action="">
          <h1 className="text-3xl text-center mb-8">Sign Up</h1>

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
              type="email"
              placeholder="E-Mail"
              required
              className="w-full h-full bg-transparent outline-none border-2 border-white/10 rounded-full text-base text-white py-3 pl-5 pr-12 placeholder-white"
            />
            <FaEnvelope className='absolute right-5 top-1/2 transform -translate-y-1/2 text-lg' />
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
              I agree to the Terms & conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-primary-500 border-none outline-none rounded-full shadow-lg cursor-pointer text-base text-gray-800"
          >
            Sign Up
          </button>

          <div className="text-sm text-center mt-5">
            <p>Already have an account? <Link to="/login" className="text-white font-semibold hover:underline">Login</Link></p>
          </div>
        </form>
      </div>

    </div>
  );
}

export default Signup;
