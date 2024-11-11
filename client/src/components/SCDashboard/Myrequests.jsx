import React, { useEffect } from 'react';
import { useScrapCollector } from '../../context/scrapcollectorContext';

const MyRequests = () => {
  const { profile, fetchProfile } = useScrapCollector();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div className="p-6 bg-zinc-900 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-zinc-100 mb-6">My Active Requests</h2>

      {profile?.assignedPickups?.length > 0 ? (
        <div className="space-y-6">
          {profile.assignedPickups.map((request) => (
            <div key={request._id} className="p-4 bg-zinc-800 rounded-lg shadow-md transition duration-200 transform hover:scale-105 hover:shadow-lg">
              {request.image && (
                <img
                  src={request.image}
                  alt="Scrap"
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
              )}
              <div className="space-y-2">
                <p className="text-zinc-300"><span className="font-semibold text-zinc-200">Location:</span> {request.location}</p>
                <p className="text-zinc-300"><span className="font-semibold text-zinc-200">Status:</span> {request.status}</p>
                <p className="text-zinc-300"><span className="font-semibold text-zinc-200">Pickup Date:</span> {new Date(request.pickupDate).toLocaleDateString()}</p>
                <p className="text-zinc-300"><span className="font-semibold text-zinc-200">Scrap Details:</span> {request.scrapDetails.join(', ')}</p>
                <p className="text-zinc-300"><span className="font-semibold text-zinc-200">Created At:</span> {new Date(request.createdAt).toLocaleString()}</p>
                <p className="text-zinc-300"><span className="font-semibold text-zinc-200">Updated At:</span> {new Date(request.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-zinc-400">No requests accepted yet.</p>
      )}
    </div>
  );
};

export default MyRequests;
