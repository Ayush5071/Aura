import React, { createContext, useState, useContext, useEffect } from "react";
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

    console.log("Credentials are:", credentials);

    try {
      const response = await fetch("http://localhost:4000/api/scrapcollector/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      setScrapCollector(data); // Assuming response contains scrap collector data
      Cookies.set("scrapCollector", JSON.stringify(data), { expires: 1 });
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
      const response = await fetch("http://localhost:4000/api/scrapcollector/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Registration failed");

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

      const response = await fetch("http://localhost:4000/api/scrapcollector/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();
      console.log(data, "-> in fetch profile");
      setProfile(data.scrapCollector);
    } catch (err) {
      setError("Failed to fetch profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedData) => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/scrapcollector/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Profile update failed");

      const data = await response.json();
      setProfile(data);
      return data; 
    } catch (error) {
      setError("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logoutScrapCollector = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:4000/api/scrapcollector/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Logout failed");

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
        updateProfile,
      }}
    >
      {children}
    </ScrapCollectorContext.Provider>
  );
};

export const useScrapCollector = () => useContext(ScrapCollectorContext);
