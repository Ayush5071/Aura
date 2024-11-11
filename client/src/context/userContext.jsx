import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie for cookie management

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try to get the user from cookies instead of localStorage
    const storedUser = Cookies.get("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = (userData) => {
    // Save the user data in cookies
    setUser(userData);
    Cookies.set("user", JSON.stringify(userData), { expires: 1 }); // expires after 1 day
    fetchProfile();
  };

  const logout = () => {
    setUser(null);
    // Remove the user and token cookies
    Cookies.remove("user");
    Cookies.remove("token");
  };

  const fetchProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const token = Cookies.get("token"); // Get the token from the cookie
      if (!token) {
        console.error("Token is missing in the cookie.");
        return;
      }

      // Set token in axios request headers
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;

      // Fetch the user's profile from the API
      const response = await axios.get("http://localhost:4000/api/user/profile", {
        withCredentials: true,
      });
      console.log(response.data,"ye hor ha h ?");
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, profile, loading, login, logout, fetchProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
