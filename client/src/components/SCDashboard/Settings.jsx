import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useScrapCollector } from "../../context/scrapcollectorContext";

const Settings = () => {
  const { profile, updateProfile, loading, fetchProfile } = useScrapCollector();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactnumber] = useState("");
  const [preferredLocation, setPreferredLocation] = useState([]);  // New array for preferred locations
  const [newLocation, setNewLocation] = useState("");  // Temporary state for new location input
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      fetchProfile(); // Fetch profile if not available
    } else {
      setName(profile.name);
      setEmail(profile.email);
      setContactnumber(profile.contactNumber);
      setPreferredLocation(profile.preferredLocation || []);  // Set preferred locations array
      setPreviewImage(profile.image || "https://via.placeholder.com/150");
    }
  }, [profile, fetchProfile]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setContactnumber(e.target.value);
  
  const handleLocationChange = (e) => setNewLocation(e.target.value);  // Handle location input

  const handleAddLocation = () => {
    if (newLocation && !preferredLocation.includes(newLocation)) {
      setPreferredLocation([...preferredLocation, newLocation]); // Add new location to the list
      setNewLocation(""); // Reset input field
    }
  };

  const handleRemoveLocation = (location) => {
    setPreferredLocation(preferredLocation.filter((loc) => loc !== location)); // Remove location
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
    updatedData.append("preferredLocation", JSON.stringify(preferredLocation)); // Convert array to string
    if (image) updatedData.append("image", image);

    try {
      await updateProfile(updatedData); // Update the profile with the new data
      setSuccessMessage("Profile updated successfully!");
      setErrorMessage("");
      setTimeout(() => {
        navigate("/scrapcollector/dashboard"); // Redirect to dashboard after success
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
          {/* Profile Image Preview */}
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 shadow-md">
              <img
                src={previewImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Change Profile Picture */}
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

          {/* Full Name Input */}
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

          {/* Email Input */}
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

          {/* Phone Number Input */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={contactNumber}
              onChange={handlePhoneChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Enter your contact number"
            />
          </div>

          {/* Preferred Locations Input */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Preferred Locations
            </label>
            <div className="mb-2">
              <input
                type="text"
                value={newLocation}
                onChange={handleLocationChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="Enter a preferred location"
              />
              <button
                type="button"
                onClick={handleAddLocation}
                className="w-full py-2 mt-2 bg-teal-500 text-white rounded-md shadow-md hover:bg-teal-600"
              >
                Add Location
              </button>
            </div>

            {/* Display List of Preferred Locations */}
            <div>
              {preferredLocation.length > 0 && (
                <ul className="list-disc pl-6">
                  {preferredLocation.map((location, index) => (
                    <li key={index} className="flex justify-between items-center">
                      {location}
                      <button
                        type="button"
                        onClick={() => handleRemoveLocation(location)}
                        className="text-red-500 ml-2"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Submit Button */}
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
