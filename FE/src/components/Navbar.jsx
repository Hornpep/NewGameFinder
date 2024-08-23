import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Search from './Search';
import LoginModal from './Modal';

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <nav className="bg-gray-900 p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-white"
            >
              LOGO
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>

            <Link
              to="/Recommendations"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Recommendations
            </Link>
            <Link
              to="/Wishlist"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Wishlist
            </Link>
            <Link
              to="/Account"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Account
            </Link>

            <Search />

            <button 
              onClick={openLoginModal} 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Render LoginModal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default Navbar;