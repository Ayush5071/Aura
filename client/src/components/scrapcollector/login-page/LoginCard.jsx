import { useState } from "react";
import { useUser } from "../../../context/userContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { Link } from "react-router-dom";

const LoginCard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/scrapcollector/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // This is equivalent to axios's withCredentials: true
        body: JSON.stringify({
          email: username,
          password
        })
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      console.log(data);
      

      if (data) {
        login(response.data.user);
        toast.success('Login successful!');
      } else {
        toast.error(response.data.error || 'Login failed, please try again.');
      }
    } catch (error) {
      console.error(error.response ? error.response.data.error : error.message);
      toast.error(error.response?.data?.error || 'Login failed, please try again.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[url('/auth-bg.jpg')] bg-cover">
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} />

      <div className="form-container h-128 mx-auto my-20 w-4/5 md:w-2/3 lg:w-1/2 p-10 bg-gradient-to-b from-gray-800 to-black shadow-lg rounded-lg transition duration-300 hover:shadow-xl border-2 border-yellow-500 flex flex-col justify-center items-center">
        <h1 className="text-center text-5xl py-10 font-bold text-yellow-400 tracking-widest font-sans">
          JOIN TEAM AURA
        </h1>

        <form onSubmit={handleLogin} className='flex flex-col justify-center w-full'>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => handleInputChange(e, setUsername)}
              className="w-full p-3 bg-gray-900 text-white rounded-md focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out hover:bg-gray-800 shadow-md hover:shadow-lg glow-input typing"
              autoComplete="off"
            />
          </div>

          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
              className="w-full p-3 bg-gray-900 text-white rounded-md focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out hover:bg-gray-800 shadow-md hover:shadow-lg glow-input typing"
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-md transition-all shadow-lg hover:shadow-xl"
          >
            Join the Sustainability Squad 🌍
          </button>
        </form>
        <div className="mt-4 text-gray-300">
          <p>
            Don't have an account yet? {' '}
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
