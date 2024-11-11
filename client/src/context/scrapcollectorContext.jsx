import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie for cookie management

const ScrapCollectorContext = createContext();

export const ScrapCollectorProvider = ({ children }) => {
  const [scrapCollector, setScrapCollector] = useState(() => {
    const storedCollector = Cookies.get("scrapCollector");
    return storedCollector ? JSON.parse(storedCollector) : null;
  });

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Login function
  const loginScrapCollector = async (credentials) => {
    setLoading(true);
    setError(null);

    console.log("yecreaddntias hai",credentials);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/scrapcollector/login",
        credentials
      );
      setScrapCollector(response.data); // Assuming response contains scrap collector data
      Cookies.set("scrapCollector", JSON.stringify(response.data), { expires: 1 });
      fetchProfile(); // Fetch profile after successful login
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const registerScrapCollector = async (data) => {
    setLoading(true);
    setError(null);

    try {
      await axios.post("http://localhost:4000/api/scrapcollector/register", data);
      setError(null); // Reset error if registration is successful
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = Cookies.get("token");
      if (!token) {
        console.error("Token is missing in the cookie.");
        return;
      }

      axios.defaults.headers["Authorization"] = `Bearer ${token}`;

      const response = await axios.get("http://localhost:4000/api/scrapcollector/profile", {
        withCredentials: true,
      });
      console.log(response.data,"-> in fetch profile");
      setProfile(response.data.scrapCollector);
    } catch (err) {
      setError("Failed to fetch profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logoutScrapCollector = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.post("http://localhost:4000/api/scrapcollector/logout", {}, { withCredentials: true });
      setScrapCollector(null);
      setProfile(null);
      Cookies.remove("scrapCollector");
      Cookies.remove("token");
    } catch (err) {
      setError("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch profile on login if the user is logged in
  useEffect(() => {
    if (scrapCollector) {
      fetchProfile();
    }
  }, [scrapCollector]);

  return (
    <ScrapCollectorContext.Provider
      value={{
        scrapCollector,
        profile,
        loading,
        error,
        loginScrapCollector,
        registerScrapCollector,
        fetchProfile,
        logoutScrapCollector,
      }}
    >
      {children}
    </ScrapCollectorContext.Provider>
  );
};

export const useScrapCollector = () => useContext(ScrapCollectorContext);
