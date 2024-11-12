import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useUser } from "../../context/userContext";

const Settings = () => {
  const { profile, updateProfile, loading, fetchProfile } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactnumber] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); 

  // Fetch profile data if not already loaded
  useEffect(() => {
    if (!profile) {
      fetchProfile(); // Fetch profile from context if not available
    } else {
      setName(profile.user.name);
      setEmail(profile.user.email);
      setContactnumber(profile.user.contactNumber);
      setPreviewImage(profile.user.image || "https://via.placeholder.com/150");
      setContactnumber(profile.user.contactNumber)
    }
  }, [profile, fetchProfile]);

  console.log(profile,"ye h profile");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setContactnumber(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append("name", name);
    updatedData.append("email", email);
    updatedData.append("contactNumber", contactNumber);
    if (image) updatedData.append("image", image);

    try {
      await updateProfile(updatedData);  // Call updateProfile function from context
      setSuccessMessage("Profile updated successfully!");
      setErrorMessage("");
      setTimeout(() => {
        navigate("/customer/dashboard"); // Redirect after success
      }, 2000);
    } catch (error) {
      setErrorMessage("Failed to update profile.");
      setSuccessMessage("");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
      <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Profile Settings</h2>

        {errorMessage && (
          <div className="text-center text-red-500 mb-4">{errorMessage}</div>
        )}

        {successMessage && (
          <div className="text-center text-green-500 mb-4">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 shadow-md">
              <img
                src={previewImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-center">
            <label className="text-lg font-semibold text-gray-700 mb-2 block">
              Change Profile Picture
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="block mx-auto text-gray-500 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
              accept="image/*"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={contactNumber}
              onChange={handlePhoneChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Enter your contactNumber number"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-md shadow-md hover:bg-gradient-to-l transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
