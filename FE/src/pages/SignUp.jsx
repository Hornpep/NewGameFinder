import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context';
import { signup } from '../data/auth.js';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import backgroundImage from '../assets/desk-bg-pic.jpg';


export default function Signup() {
  const { isAuthenticated, setCheckSession, setIsAuthenticated } = useAuth();
  const [{ username, email, password, confirmPassword }, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      if (!username || !email || !password || !confirmPassword) 
        throw new Error('All fields are required');
      if (password !== confirmPassword) 
        throw new Error('Passwords do not match');
      if (password.length < 8) 
        throw new Error('Password must be at least 8 characters long');

      setLoading(true);
      const res = await signup({ username, email, password });
      setIsAuthenticated(true);
      setCheckSession(true);
      toast.success(res.success)
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to='/' />;

  return (
    <div 
      className="flex justify-center items-center min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      <div className="w-96 h-auto bg-black/30 rounded-lg text-white p-8 absolute top-40 left-1/2 transform -translate-x-1/2 mt-10 mb-10 border-2 border-white/20 backdrop-blur shadow-[0_0_15px_rgba(0,0,0,0.5)]">
      <form onSubmit={handleSubmit}>
          <h1 className="text-3xl text-center mb-8">Sign Up</h1>

          <div className="relative w-full h-12 mb-8">
            <input
              type="text"
              placeholder="Username"
              name='username'
              onChange={handleChange}
              required
              className="w-full h-full bg-transparent outline-none border-2 border-white/10 rounded-full text-base text-white py-3 pl-5 pr-12 placeholder-white"
            />
            <FaUser className='absolute right-5 top-1/2 transform -translate-y-1/2 text-lg' />
          </div>

          <div className="relative w-full h-12 mb-8">
            <input
              type="email"
              placeholder="E-Mail"
              name='email'
              onChange={handleChange}
              required
              className="w-full h-full bg-transparent outline-none border-2 border-white/10 rounded-full text-base text-white py-3 pl-5 pr-12 placeholder-white"
            />
            <FaEnvelope className='absolute right-5 top-1/2 transform -translate-y-1/2 text-lg' />
          </div>

          <div className="relative w-full h-12 mb-8">
            <input
              type="password"
              placeholder="Password"
              name='password'
              onChange={handleChange}
              required
              className="w-full h-full bg-transparent outline-none border-2 border-white/10 rounded-full text-base text-white py-3 pl-5 pr-12 placeholder-white"
            />
            <FaLock className='absolute right-5 top-1/2 transform -translate-y-1/2 text-lg' />
          </div>

          <div className="relative w-full h-12 mb-8">
            <input
              type="password"
              placeholder="Confirm Password"
              name='confirmPassword'
              onChange={handleChange}
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

          <button type="submit" className="w-full h-12 bg-primary-500 border-none outline-none rounded-full shadow-lg cursor-pointer text-base text-gray-800">
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