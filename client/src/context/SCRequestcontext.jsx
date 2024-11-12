import React, { createContext, useContext, useState, useEffect } from 'react';

const ScRequestContext = createContext();

export const useScRequest = () => useContext(ScRequestContext);

const ScRequestProvider = ({ children }) => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [allRequestsByStatus, setAllRequestsByStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // Utility function to handle fetch requests
  const handleFetchRequest = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      return await response.json();
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    }
  };

  // Fetch Accepted Requests
  const fetchAcceptedRequests = async () => {
    setLoading(true);
    try {
      const data = await handleFetchRequest(
        'http://localhost:4000/api/scrapcollector/scraprequest/myrequests',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAcceptedRequests(data.requests);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Requests by Status
  const fetchRequestsByStatus = async (status) => {
    setLoading(true);
    try {
      const data = await handleFetchRequest(
        `http://localhost:4000/api/scrapcollector/scraprequest/requests/${status}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllRequestsByStatus(prevRequests => [
        ...prevRequests.filter(req => req.status !== status), 
        ...data.requests
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Accept Pickup Request
  const acceptPickupRequest = async (requestId) => {
    setLoading(true);
    try {
      const data = await handleFetchRequest(
        `http://localhost:4000/api/scrapcollector/scraprequest/accept/${requestId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAcceptedRequests(); // Reload accepted requests
      return data.message;
    } finally {
      setLoading(false);
    }
  };

  // Update Request Status
  const updateRequestStatus = async (requestId, status) => {
    setLoading(true);
    try {
      const data = await handleFetchRequest(
        `http://localhost:4000/api/scrapcollector/scraprequest/updateStatus/${status}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ requestId }),
        }
      );
      fetchRequestsByStatus(status); // Reload requests for the given status
      return data.message;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAcceptedRequests();
  }, []);

  return (
    <ScRequestContext.Provider
      value={{
        acceptedRequests,
        allRequestsByStatus,
        fetchAcceptedRequests,
        fetchRequestsByStatus,
        acceptPickupRequest,
        updateRequestStatus,
        loading,
        error,
      }}
    >
      {children}
    </ScRequestContext.Provider>
  );
};

export default ScRequestProvider;
