import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { ToastContainer, toast} from "react-toastify";
import "react-toastify/ReactToastify.css"
const SignupCard = () => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      toast.error("Passwords do not match!")
      return 
    }
    try {
      const response = await axios.post(`http://localhost:4000/api/users/register`, {
        name, email, password
      })
      console.log(response.data);
      toast.success("Signup Successful! Redirecting...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(error.response ? error.response.data.error: error.message);
      toast.error(error.response.data.error || "SIGNUP FAILED, please try again")
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[url('C:\Users\asus\.vscode\Aura\client\public\d8100b4b-898a-4909-a4a0-3c1aa9cfc694.jpg')] relative  w-full bg-cover h-screen">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="form-container h-110  my-20 w-3/5 md:w-1/4 lg:w-1/3 p-10 bg-gradient-to-b from-gray-800 to-black shadow-lg rounded-lg transition duration-300 hover:shadow-xl border-2 border-yellow-500 flex flex-col justify-center items-center">
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="form-container h-128 mx-auto my-20 w-4/5 md:w-2/3 lg:w-1/2 p-10 bg-gradient-to-b from-gray-800 to-black shadow-lg rounded-lg transition duration-300 hover:shadow-xl border-2 border-yellow-500 flex flex-col justify-center items-center">
        <h1 className="text-center text-5xl py-10 font-bold text-yellow-400 tracking-widest font-sans">
          SIGN UP FOR TEAM AURA
        </h1>
        
        <form className='flex flex-col justify-center w-full' onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => handleInputChange(e, setUsername)}
              className="w-full p-3 bg-gray-900 text-white rounded-md focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out hover:bg-gray-800 shadow-md hover:shadow-lg glow-input typing"
              autoComplete="off"
            />
          </div>

          <div className="relative mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
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

          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => handleInputChange(e, setConfirmPassword)}
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
            Already have an account?{' '}
            <Link to="/login" className="text-yellow-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupCard;
