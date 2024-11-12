import React, { createContext, useContext, useState, useEffect } from "react";

const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/scraprequest/schedules', {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to load requests');
      const data = await response.json();
      setRequests(data.schedules);
    } catch (err) {
      setError('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const fetchRequestsByStatus = async (status) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/user/scraprequest/status/${status}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to load requests by status');
      const data = await response.json();
      setRequests(data.schedules);
    } catch (err) {
      setError('Failed to load requests by status');
    } finally {
      setLoading(false);
    }
  };

  const createRequest = async (newRequest) => {
    try {
      const response = await fetch('/api/user/scraprequest/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newRequest),
      });
      if (!response.ok) throw new Error('Failed to create request');
      const data = await response.json();
      setRequests((prevRequests) => [...prevRequests, data.schedule]);
    } catch (err) {
      setError('Failed to create request');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <RequestContext.Provider value={{ requests, loading, error, fetchRequests, fetchRequestsByStatus, createRequest }}>
      {children}
    </RequestContext.Provider>
  );
};

export const useRequest = () => useContext(RequestContext);
