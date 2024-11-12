import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "../../../context/userContext"; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Add this import
import "react-toastify/dist/ReactToastify.css";

const LoginCard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: username,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        login(data.user);
        toast.success("Login Successful! Redirecting...");
        setTimeout(() => {
          navigate("/customer/dashboard"); // Redirect to dashboard after login
        }, 1500);
      } else {
        toast.error(data.error || "Login failed, please try again.");
      }
    } catch (error) {
      toast.error(error.message || "Login failed, please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-cover bg-[url('/auth-bg.jpg')]">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="form-container h-128 mx-auto my-20 w-4/5 md:w-2/3 lg:w-1/2 p-10 bg-gradient-to-b from-gray-800 to-black shadow-lg rounded-lg transition duration-300 hover:shadow-xl border-2 border-yellow-500 flex flex-col justify-center items-center">
        <h1 className="text-center text-5xl py-10 font-bold text-yellow-400 tracking-widest font-sans">
          JOIN TEAM AURA
        </h1>
        
        <form className="flex flex-col justify-center w-full" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => handleInputChange(e, setUsername)}
            className="w-full p-3 bg-gray-900 text-white rounded-md focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out hover:bg-gray-800 shadow-md hover:shadow-lg"
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => handleInputChange(e, setPassword)}
            className="w-full p-3 bg-gray-900 text-white rounded-md focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out hover:bg-gray-800 shadow-md hover:shadow-lg"
            autoComplete="off"
          />
          <button
            type="submit"
            className="w-full p-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-md transition-all shadow-lg hover:shadow-xl"
          >
            Login to the Sustainability Squad 🌍
          </button>
        </form>

        <div className="mt-4 text-gray-300">
          <p>
            Don't have an account?{' '}
            <Link to="/customer/signup" className="text-yellow-500 hover:underline">
              Sign Up Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
