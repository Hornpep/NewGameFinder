import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

const Navbar = () => {
  return (
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

          <Link
            to="/Login"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
