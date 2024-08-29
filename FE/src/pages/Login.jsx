import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context';
import { login } from '../data/auth';
import backgroundImage from '../assets/desk-bg-pic.jpg';

export default function Login({ closeModal }) {
  const location = useLocation();
  const { isAuthenticated, setCheckSession, setIsAuthenticated } = useAuth();
  const [{ email, password }, setForm] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) throw new Error('Alle Felder sind erforderlich');
      setLoading(true);
      const response = await login({ email, password });
      
      if (response.success) {
        setIsAuthenticated(true);
        setCheckSession(true);
        toast.success('Login erfolgreich');
        setForm({ email: '', password: '' });
        if (closeModal) closeModal(); // Close the modal on success
      } else {
        toast.error('Login fehlgeschlagen');
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to={location.state?.next || '/'} />;

  return (
    <div 
      className="flex justify-center items-center min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      <div className="w-96 h-auto  bg-black/30 rounded-lg text-white p-8 absolute top-40 left-1/2 transform -translate-x-1/2 mt-10 border-2 border-white/20 backdrop-blur shadow-[0_0_10px_rgba(0,0,0,0.2)]">
      <form onSubmit={handleSubmit}>
          <h1 className="text-3xl text-center mb-8">Login</h1>

          <div className="relative w-full h-12 mb-8">
            <input
              type="email"
              placeholder="E-Mail"
              name='email'
              value={email}
              onChange={handleChange}
              required
              className="w-full h-full bg-transparent outline-none border-2 border-white/10 rounded-full text-base text-white py-3 pl-5 pr-12 placeholder-white"
            />
            <FaUser className='absolute right-5 top-1/2 transform -translate-y-1/2 text-lg' />
          </div>

          <div className="relative w-full h-12 mb-8">
            <input
              type="password"
              placeholder="Password"
              name='password'
              value={password}
              onChange={handleChange}
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

          <button type="submit" className="w-full h-12 bg-primary-500 border-none outline-none rounded-full shadow-lg cursor-pointer text-base text-gray-800">
            Login
          </button>

          <div className="text-sm text-center mt-5">
            <p>
              Don't have an account?{' '}
              {/* Close modal when clicking Sign Up */}
              <Link to="/signup" className="text-white font-semibold hover:underline" onClick={closeModal}> 
                Sign Up
              </Link> 
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}