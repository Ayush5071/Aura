import React, { useEffect } from "react";
import { useScrapCollector } from "../../context/scrapcollectorContext";


const Sprofile = () => {
  const { profile, loading, error, fetchProfile } = useScrapCollector();

  console.log(profile,"dekhlo");

  useEffect(() => {
    if (!profile) {
      fetchProfile(); 
    }
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Loading profile data...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!profile) {
    return <div className="text-center">No profile data available</div>;
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg mt-6">
      <div className="flex flex-col items-center justify-center mb-6">
        {/* Profile Image Section */}
        <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4">
          {profile.image ? (
            <img
              src={profile.image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl text-white">{profile.name?.charAt(0)}</span>
          )}
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">{profile.name}</h3>
        <p className="text-gray-500">{profile.email}</p>
        <p className="text-gray-500">Scrap Collector</p>
      </div>

      {/* Additional Profile Details Section */}
      <div className="mt-6">
        <h4 className="font-semibold text-lg text-gray-800 mb-3">Profile Details</h4>
        <div className="space-y-2 text-gray-600">
          <p><strong>Role:</strong> {profile.role || 'Scrap Collector'}</p>
          <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
          <p><strong>Verified:</strong> {profile.isVerified ? 'Yes' : 'No'}</p>
          {/* Add more fields as necessary */}
        </div>
      </div>
    </div>
  );
};

export default Sprofile;
