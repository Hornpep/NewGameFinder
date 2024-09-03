import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import profileImage from '../assets/no-photo.png'; // Default Image
import { AuthContext } from '../context';

const Account = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(profileImage);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/whoami', { withCredentials: true });
        setUserData(response.data);
        setFormData({
          username: response.data.success.username,
          email: response.data.success.email,
          password: '',
          confirmPassword: '',
          image: response.data.success.image,
        });
        setPreviewImage(response.data.success.image || profileImage);
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      if (formData.password) {
        formDataToSend.append('password', formData.password);
      }
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await axios.put(`http://localhost:8080/auth/${userData.success.id}`, formDataToSend, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUserData((prevData) => ({
        ...prevData,
        success: {
          ...prevData.success,
          username: formData.username,
          email: formData.email,
          image: previewImage,
        },
      }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">Loading...</div>;
  }

  if (!userData) {
    return <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">User not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white p-8 pt-28">
      <div className="max-w-4xl mx-auto bg-[#1C1C1C] p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-[#1CE0AF]">My Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <div className="flex-1 pr-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1CE0AF]" htmlFor="username">User:</label>
                  <input 
                    type="text" 
                    id="username" 
                    value={formData.username} 
                    onChange={handleInputChange} 
                    readOnly={!isEditing}
                    className="w-full bg-[#1C1C1C] p-2 rounded border border-[#1CE0AF] focus:outline-none focus:bg-[#2C2C2C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1CE0AF]" htmlFor="email">Email:</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    readOnly={!isEditing}
                    className="w-full bg-[#1C1C1C] p-2 rounded border border-[#1CE0AF] focus:outline-none focus:bg-[#2C2C2C]"
                  />
                </div>
                {isEditing && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#1CE0AF]" htmlFor="password">Password:</label>
                      <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full bg-[#1C1C1C] p-2 rounded border border-[#1CE0AF] focus:outline-none focus:bg-[#2C2C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1CE0AF]" htmlFor="confirmPassword">Confirm Password:</label>
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full bg-[#1C1C1C] p-2 rounded border border-[#1CE0AF] focus:outline-none focus:bg-[#2C2C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1CE0AF]" htmlFor="image">Profile Image:</label>
                      <input 
                        type="file" 
                        id="image" 
                        onChange={handleImageChange}
                        className="w-full bg-[#1C1C1C] p-2 rounded border border-[#1CE0AF]"
                      />
                    </div>
                  </>
                )}
                {isEditing ? (
                  <button type="submit" className="mt-2 px-4 py-2 bg-[#1CE0AF] text-black font-semibold rounded hover:bg-[#1DD0E0]" aria-label="Submit Changes">
                    Submit
                  </button>
                ) : (
                  <button type="button" onClick={handleEditClick} className="mt-2 px-4 py-2 bg-[#1CE0AF] text-black font-semibold rounded hover:bg-[#1DD0E0]" aria-label="Edit Account">
                    Edit
                  </button>
                )}
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-[#1CE0AF]">
                <img src={previewImage} alt="User profile" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;