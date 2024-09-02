import React from 'react';
import profileImage from '../assets/no-photo.png';

const Account = () => {
  return (
    <div className="min-h-screen bg-[#141414] text-white p-8 pt-28">
      <div className="max-w-2xl mx-auto bg-[#1C1C1C] p-6 rounded-lg shadow-lg">

        <h1 className="text-3xl font-bold mb-6 text-[#1CE0AF]">My Account</h1>
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">

          <div className="flex-1">
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1CE0AF]" htmlFor="username">Username:</label>
              <p id="username" className="bg-[#1C1C1C] p-2 rounded border border-[#1CE0AF]">Patty O'Green</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1CE0AF]" htmlFor="email">E-Mail:</label>
              <p id="email" className="bg-[#1C1C1C] p-2 rounded border border-[#1CE0AF]">green@rainbow.com</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1CE0AF]" htmlFor="password">Password:</label>
              <p id="password" className="bg-[#1C1C1C] p-2 rounded border border-[#1CE0AF]">*****</p>
            </div>
            <button className="mt-2 px-4 py-2 bg-[#1CE0AF] text-black font-semibold rounded hover:bg-[#1DD0E0]" aria-label="Edit Account">
              Edit
            </button>
          </div>

          <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-[#1CE0AF]">
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Account;