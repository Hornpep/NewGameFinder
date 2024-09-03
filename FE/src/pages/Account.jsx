import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import profileImage from '../assets/no-photo.png'; // Default Image
import { AuthContext } from '../context';

const Account = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/whoami', { withCredentials: true });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!userData) {
      fetchUserData();
    }
  }, [userData]);

  if (loading) {
    return <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">Loading...</div>;
  }

  if (!userData) {
    return <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">User not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white p-8 pt-28">
      <div className="max-w-2xl mx-auto bg-[#1C1C1C] p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-[#1CE0AF]">My Account</h1>
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
          <div className="flex-1">
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1CE0AF]" htmlFor="username">User:</label>
              <p type="username" id="username" className="bg-[#1C1C1C] p-2 rounded border border-[#1CE0AF]">
                {userData.success.username}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1CE0AF]" htmlFor="email">Email:</label>
              <p type="email" id="email" className="bg-[#1C1C1C] p-2 rounded border border-[#1CE0AF]">
                {userData.success.email}
              </p>
            </div>
            <button className="mt-2 px-4 py-2 bg-[#1CE0AF] text-black font-semibold rounded hover:bg-[#1DD0E0]" aria-label="Edit Account">
              Edit
            </button>
          </div>

          <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-[#1CE0AF]">
            <img src={userData.image || profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;