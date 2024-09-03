import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Search from './Search';
import LoginModal from './Modal';
import { useAuth } from '../context';

const Navbar = () => {
  const { isAuthenticated, signout, user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <nav className="flex flex-row fixed top-0 left-0 w-full z-50 p-4 bg-[#141414] text-white shadow-lg">
        <div className="flex mx-14">
          <Link to="/" onClick={() => handleLinkClick('/')}>
            <img 
              src="/src/assets/NextGameFinder-Logo.png" 
              alt="NextGameFinder" 
              className="h-12 w-auto hover:opacity-90 transition-opacity duration-300"
            />
          </Link>
        </div>

        <div className="flex-1 hidden md:flex justify-center space-x-6">
          {[
            { path: '/', label: 'Home' },
            { path: '/Recommendations', label: 'Recommendations' },
            { path: '/Wishlist', label: 'Wishlist' },
            { path: '/Account', label: 'Account' },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-lg font-semibold px-4 py-2 rounded-md transition duration-300 ${
                activeLink === link.path
                  ? 'bg-[#1CE0AF] text-black'
                  : 'bg-transparent text-white hover:bg-[#1CE0AF] hover:text-black'
              }`}
              onClick={() => handleLinkClick(link.path)}
            >
              {link.label}
            </Link>
          ))}

          <Search />

          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLinkClick('/Logout');
                signout();
              }}
              className={`text-lg font-semibold px-4 py-2 rounded-md transition duration-300 ${
                activeLink === '/Logout'
                  ? 'bg-[#1CE0AF] text-black'
                  : 'bg-transparent text-white hover:bg-[#1CE0AF] hover:text-black'
              }`}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                handleLinkClick('/Login');
                openLoginModal();
              }}
              className={`text-lg font-semibold px-4 py-2 rounded-md transition duration-300 ${
                activeLink === '/Login'
                  ? 'bg-[#1CE0AF] text-black'
                  : 'bg-transparent text-white hover:bg-[#1CE0AF] hover:text-black'
              }`}
            >
              Login
            </button>
          )}
        </div>
      </nav>

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default Navbar;
