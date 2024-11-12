import React, { useEffect } from "react";
import { useRequest } from "../../context/RequestProvider";

const AllRequests = () => {
  const { requests, loading, error, fetchRequests } = useRequest();

  useEffect(() => {
    fetchRequests(); // Fetch all requests when the component mounts
  }, []);

  if (loading) {
    return <div className="text-white text-center">Loading...</div>; // Show loading indicator
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>; // Show error message
  }

  return (
    <div className="w-[80vw] max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">All Requests</h2>

      {/* If there are no requests */}
      {requests.length === 0 ? (
        <div className="text-center">No requests found.</div>
      ) : (
        <div className="space-y-4">
          {requests.map((request, index) => (
            <div key={request._id} className="p-4 border rounded-md bg-gray-700">
              <h3 className="text-xl font-semibold mb-2">Request #{index + 1}</h3>
              <p><strong>Pickup Date:</strong> {request.pickupDate}</p>
              <p><strong>Location:</strong> {request.location}</p>
              
              <div className="mt-2">
                <strong>Scrap Details:</strong>
                <ul className="space-y-2">
                  {request.scrapDetails.map((detail, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{detail.type}</span>
                      <span>{detail.weight} kg</span>
                    </li>
                  ))}
                </ul>
              </div>

              {request.imgUrl && (
                <div className="mt-4">
                  <strong>Uploaded Image:</strong>
                  <div className="w-full h-64 bg-gray-600 mt-2">
                    <img
                      src={request.imgUrl}
                      alt={`Request Image for Request #${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <p className="mt-4"><strong>Status:</strong> {request.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRequests;
