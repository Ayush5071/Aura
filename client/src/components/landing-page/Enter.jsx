/* eslint-disable react/prop-types */

const Enter = ({ text, onClick, icon }) => {
  return (
    <button 
      onClick={onClick} 
      className="flex items-center justify-center px-6 py-3 mt-4 text-lg font-bold text-white bg-red-600 border-2 border-red-700 rounded-md shadow-lg hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
    >
      <span className="mr-2">{icon}</span>
      {text}
    </button>
  );
};

export default Enter;
