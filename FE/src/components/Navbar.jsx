import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Search from './Search';
import LoginModal from './Modal';

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State for LoginModal

  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  // Open and close LoginModal
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <nav className="flex flex-row fixed top-0 left-0 w-full z-50 text-[#1CE0AF] bg-[#141414] p-6">
        <div className="flex mx-14">
          <Link
            to="/"
            className="text-3xl font-heading font-extrabold text-[#1CE0AF]"
            onClick={() => handleLinkClick('/')}
          >
            LOGO
          </Link>
        </div>
        <div className="flex-1 hidden font-heading font-extrabold md:flex justify-center space-x-4">
          <Link
            to="/"
            className={`text-2xl border shadow-lg font-heading px-3 py-2 rounded-md ${
              activeLink === '/'
                ? 'border-[#1CE0AF] text-[#1CE0AF]'
                : 'border-[#1CE0AF] text-[#fefefe] hover:text-[#1DD0E0] hover:border-[#1DD0E0]'
            }`}
            onClick={() => handleLinkClick('/')}
          >
            Home
          </Link>
          <Link
            to="/Recommendations"
            className={`text-2xl border px-3 py-2 rounded-md ${
              activeLink === '/Recommendations'
                ? 'border-[#1CE0AF] text-[#1CE0AF]'
                : 'border-[#1CE0AF] text-[#fefefe] hover:text-[#1DD0E0] hover:border-[#1DD0E0]'
            }`}
            onClick={() => handleLinkClick('/Recommendations')}
          >
            Recommendations
          </Link>
          <Link
            to="/Wishlist"
            className={`text-2xl border px-3 py-2 rounded-md ${
              activeLink === '/Wishlist'
                ? 'border-[#1CE0AF] text-[#1CE0AF]'
                : 'border-[#1CE0AF] text-[#fefefe] hover:text-[#1DD0E0] hover:border-[#1DD0E0]'
            }`}
            onClick={() => handleLinkClick('/Wishlist')}
          >
            Wishlist
          </Link>
          <Link
            to="/Account"
            className={`text-2xl border px-3 py-2 rounded-md ${
              activeLink === '/Account'
                ? 'border-[#1CE0AF] text-[#1CE0AF]'
                : 'border-[#1CE0AF] text-[#fefefe] hover:text-[#1DD0E0] hover:border-[#1DD0E0]'
            }`}
            onClick={() => handleLinkClick('/Account')}
          >
            Account
          </Link>

          <Search />

          {/* Add Login "button" */}
          <button
            onClick={() => {
              handleLinkClick('/Login');
              openLoginModal();
            }}
            className={`text-2xl border px-3 py-2 rounded-md ${
              activeLink === '/Login'
                ? 'border-[#1CE0AF] text-[#1CE0AF]'
                : 'border-[#1CE0AF] text-[#fefefe] hover:text-[#1DD0E0] hover:border-[#1DD0E0]'
            }`}
          >
            Login
          </button>
        </div>
      </nav>

      {/* Render LoginModal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
      />
    </>
  );
};

export default Navbar;
