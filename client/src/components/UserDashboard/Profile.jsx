import  { useEffect } from "react";
import { useUser } from "../../lib/userContext";

const Profile = () => {
  const { profile, loading, error } = useUser(); // Now using profile data directly

  useEffect(() => {
    // You can add any additional logic for when profile data is fetched
  }, [profile]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-[82vw] p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      <div className="flex items-center space-x-6 mb-6">
        <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
          {/* Display profile image if exists */}
          {profile?.image ? (
            <img
              src={profile?.image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white text-xl">
              {profile?.name?.charAt(0)}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold">{profile?.name}</h3>
          <p className="text-gray-600">{profile?.email}</p>
          <p className="text-gray-600">{profile?.role}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">My Details</h3>
        <div className="space-y-2">
          <p><strong>Contact Number:</strong> {profile?.contactNumber || 'N/A'}</p>
          <p><strong>Address:</strong> {profile?.address || 'N/A'}</p>
        </div>

        <h3 className="font-semibold">Schedules</h3>
        {profile?.mySchedules?.length > 0 ? (
          <ul className="space-y-2">
            {profile.mySchedules.map((schedule, index) => (
              <li key={index} className="p-2 border rounded-md">
                <p><strong>Schedule {index + 1}:</strong></p>
                <p>{schedule}</p> {/* Add more schedule details as per your requirement */}
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
