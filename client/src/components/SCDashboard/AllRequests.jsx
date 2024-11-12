import React, { useEffect } from 'react';
import { useScRequest } from '../../context/ScRequestContext';

const AllRequests = () => {
  const { allRequestsByStatus, fetchRequestsByStatus, loading, error } = useScRequest();

  useEffect(() => {
    fetchRequestsByStatus('pending'); // Fetch all active requests (status 'pending' or 'accepted')
    fetchRequestsByStatus('accepted'); // Adjust as per your requirements for active requests
  }, []);

  if (loading) return <p className="text-zinc-400">Loading...</p>;
  if (error) return <p className="text-zinc-400">Error: {error}</p>;

  return (
    <div className="p-6 bg-zinc-900 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-zinc-100 mb-6">All Active Requests</h2>

      {allRequestsByStatus?.length > 0 ? (
        <div className="space-y-6">
          {allRequestsByStatus.map((request) => (
            <div key={request._id} className="p-4 bg-zinc-800 rounded-lg shadow-md transition duration-200 transform hover:scale-105 hover:shadow-lg">
              {request.imgUrl && (
                <img
                  src={request.imgUrl}
                  alt="Scrap"
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
              )}
              <div className="space-y-2">
                <p className="text-zinc-300"><span className="font-semibold text-zinc-200">Location:</span> {request.location}</p>
                <p className="text-zinc-300"><span className="font-semibold text-zinc-200">Status:</span> {request.status}</p>
                <p className="text-zinc-300"><span className="font-semibold text-zinc-200">Pickup Date:</span> {new Date(request.pickupDate).toLocaleDateString()}</p>
                <p className="text-zinc-300"><span className="font-semibold text-zinc-200">Scrap Details:</span> {request.scrapDetails.map(detail => `${detail.weight}kg of ${detail.type}`).join(', ')}</p>
                <p className="text-zinc-300"><span className="font-semibold text-zinc-200">Created At:</span> {new Date(request.createdAt).toLocaleString()}</p>
                <p className="text-zinc-300"><span className="font-semibold text-zinc-200">Updated At:</span> {new Date(request.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-zinc-400">No active requests available.</p>
      )}
    </div>
  );
};

export default AllRequests;
