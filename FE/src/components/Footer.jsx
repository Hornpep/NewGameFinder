import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#141414] text-white py-8 fixed bottom-0 left-0 z-50 w-full border-gray-700">
      <div className="container mx-auto flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <p className="text-sm">&copy; 2024 NextGameFinder. All rights reserved.</p>
        <div className="flex space-x-4">
          <a
            href="#"
            className="text-sm text-[#fefefe] hover:text-[#1CE0AF] transition duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-[#fefefe] hover:text-[#1CE0AF] transition duration-300"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-sm text-[#fefefe] hover:text-[#1CE0AF] transition duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
