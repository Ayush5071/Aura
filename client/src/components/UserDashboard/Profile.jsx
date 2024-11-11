import React, { useEffect } from "react";
import { useUser } from "../../context/userContext";

const Profile = () => {
  const { user, profile, loading, error, fetchProfile } = useUser();

  useEffect(() => {
    if (user) {
      fetchProfile(); // Fetch profile only when user is logged in
    }
  }, [user]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>; // Show loading indicator
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Show error message
  }

  if (!profile) {
    return <div className="text-center">No profile data available</div>; // Fallback in case profile data is empty
  }

  // Extract the user data
  const { name, email, image, role, isVerified, contactNumber, address } = profile.user || {};

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-6">
      <div className="flex flex-col items-center justify-center mb-6">
        {/* Profile Image Section */}
        <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl text-white">{name?.charAt(0)}</span>
          )}
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-500">{email}</p>
        <p className="text-gray-500">{role}</p>
        {isVerified && (
          <span className="text-green-500 text-sm">Verified</span>
        )}
      </div>

      {/* Contact and Address Section */}
      <div className="mt-6">
        <h4 className="font-semibold text-lg text-gray-800 mb-3">Contact Details</h4>
        <div className="space-y-2 text-gray-600">
          <p><strong>Contact Number:</strong> {contactNumber || 'N/A'}</p>
          <p><strong>Address:</strong> {address || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
