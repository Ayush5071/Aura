import React, { useEffect } from "react";
import { useUser } from "../../context/userContext";

const Profile = () => {
  const { user, profile, loading, error, fetchProfile } = useUser();

  useEffect(() => {
    if (user) {
      fetchProfile(); // Fetch profile only when user is logged in
    }
  }, [user]);

  console.log(profile, "Profile data");

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>; // Show error message
  }

  if (!profile) {
    return <div>No profile data available</div>; // Fallback in case profile data is empty
  }

  return (
    <div className="w-[82vw] p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      {/* Profile Image Section */}
      <div className="flex items-center space-x-6 mb-6">
        <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
          {profile?.user?.image ? (
            <img
              src={profile?.user?.image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white text-xl">
              {profile?.user?.name?.charAt(0)}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold">{profile?.user?.name}</h3>
          <p className="text-gray-600">{profile?.user?.email}</p>
          <p className="text-gray-600">{profile?.user?.role}</p>
          {profile?.user?.isVerified && (
            <span className="text-green-500 text-sm">Verified</span>
          )}
        </div>
      </div>

      {/* Contact and Address Section */}
      <div className="space-y-4">
        <h3 className="font-semibold">My Details</h3>
        <div className="space-y-2">
          <p><strong>Contact Number:</strong> {profile?.user?.contactNumber || 'N/A'}</p>
          <p><strong>Address:</strong> {profile?.user?.address || 'N/A'}</p>
        </div>

        {/* Schedules Section */}
        <h3 className="font-semibold">Schedules</h3>
        {profile?.user?.mySchedules?.length > 0 ? (
          <ul className="space-y-2">
            {profile?.user?.mySchedules.map((schedule, index) => (
              <li key={index} className="p-2 border rounded-md">
                <p><strong>Schedule {index + 1}:</strong></p>
                <p>{schedule}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No schedules available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
