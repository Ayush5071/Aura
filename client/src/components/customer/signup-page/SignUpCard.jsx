import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../../context/userContext";

const SignupCard = () => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include', 
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Signup Successful! Redirecting...");
        login(data.user);
        setTimeout(() => {
          navigate("/customer/dashboard");
        }, 1500);
      } else {
        toast.error(data.error || "Signup failed, please try again.");
      }
    } catch (error) {
      toast.error(error.message || "Signup failed, please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-cover bg-[url('/auth-bg.jpg')]">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="form-container h-128 mx-auto my-20 w-4/5 md:w-2/3 lg:w-1/2 p-10 bg-gradient-to-b from-gray-800 to-black shadow-lg rounded-lg transition duration-300 hover:shadow-xl border-2 border-yellow-500 flex flex-col justify-center items-center">
        <h1 className="text-center text-5xl py-10 font-bold text-yellow-400 tracking-widest font-sans">
          SIGN UP FOR TEAM AURA
        </h1>
        
        <form className="flex flex-col justify-center w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => handleInputChange(e, setUsername)}
            className="w-full p-3 bg-gray-900 text-white rounded-md focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out hover:bg-gray-800 shadow-md hover:shadow-lg"
            autoComplete="off"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => handleInputChange(e, setEmail)}
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e, setConfirmPassword)}
            className="w-full p-3 bg-gray-900 text-white rounded-md focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out hover:bg-gray-800 shadow-md hover:shadow-lg"
            autoComplete="off"
          />
          <button
            type="submit"
            className="w-full p-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-md transition-all shadow-lg hover:shadow-xl"
          >
            Join the Sustainability Squad 🌍
          </button>
        </form>

        <div className="mt-4 text-gray-300">
          <p>
            Already have an account?{' '}
            <Link to="/customer/login" className="text-yellow-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupCard;
