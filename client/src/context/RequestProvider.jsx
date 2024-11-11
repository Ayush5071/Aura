import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/user/scraprequest/schedules', { withCredentials: true });
      setRequests(response.data.schedules);
    } catch (err) {
      setError('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const fetchRequestsByStatus = async (status) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/user/scraprequest/status/${status}`, { withCredentials: true });
      setRequests(response.data.schedules);
    } catch (err) {
      setError('Failed to load requests by status');
    } finally {
      setLoading(false);
    }
  };

  const createRequest = async (newRequest) => {
    try {
      const response = await axios.post('/api/user/scraprequest/schedule', newRequest, { withCredentials: true });
      setRequests((prevRequests) => [...prevRequests, response.data.schedule]);
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
