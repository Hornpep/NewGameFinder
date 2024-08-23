import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Search from './Search';
import LoginModal from './Modal';

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);     // State for LoginModal

  // Open and close LoginModal 
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <nav className="flex fixed top-0 left-0 w-full z-50 text-[#1CE0AF] bg-[#141414] p-6">
        <div className="flex mx-14">
          <Link
            to="/"
            className="text-3xl font-heading font-extrabold text-[#1CE0AF]"
          >
            LOGO
          </Link>
        </div>
        <div className="flex-1 hidden font-heading font-extrabold md:flex justify-center space-x-4">
          <Link
            to="/"
            className="text-[#1CE0AF] text-2xl border border-[#1CE0AF] shadow-lg font-heading hover:text-[#1DD0E0] hover:border hover:border-[#1DD0E0] focus:shadow-outline px-3 py-2 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/Recommendations"
            className="text-[#1CE0AF] text-2xl border border-[#1CE0AF] hover:text-[#1DD0E0] hover:border hover:border-[#1DD0E0] px-3 py-2 rounded-md"
          >
            Recommendations
          </Link>
          <Link
            to="/Wishlist"
            className="text-[#1CE0AF] text-2xl border border-[#1CE0AF] hover:text-[#1DD0E0] hover:border hover:border-[#1DD0E0] px-3 py-2 rounded-md"
          >
            Wishlist
          </Link>
          <Link
            to="/Account"
            className="text-[#1CE0AF] text-2xl border border-[#1CE0AF] hover:text-[#1DD0E0] hover:border hover:border-[#1DD0E0] px-3 py-2 rounded-md"
          >
            Account
          </Link>

          <Search />

        {/* Add Login "button" */}
          <button 
            onClick={openLoginModal} 
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Render LoginModal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default Navbar;
