import { useState } from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out bg-black w-64 z-20 md:relative md:translate-x-0`}
    >
      <button
        onClick={toggleSidebar}
        className="md:hidden absolute top-4 right-4 text-white"
      >
        <span className="block w-6 h-0.5 bg-yellow-200 mb-1"></span>
        <span className="block w-6 h-0.5 bg-yellow-200 mb-1"></span>
        <span className="block w-6 h-0.5 bg-yellow-200"></span>
      </button>
      <ul className="flex flex-col items-center mt-10 md:mt-40 gap-0 overflow-y-auto">
        <li className="cursor-pointer text-lg md:text-2xl text-center hover:bg-red-400 text-white w-full border-b-2 first:border-t-2">
          <div className="py-3 w-full">USER PROFILE</div>
        </li>
        <li className="cursor-pointer text-lg md:text-2xl text-center hover:bg-red-400 text-white w-full border-b-2">
          <div className="py-3 w-full">REQUEST PICKUP</div>
        </li>
        <li className="cursor-pointer text-lg md:text-2xl text-center hover:bg-red-400 text-white w-full border-b-2">
          <div className="py-3 w-full">PENDING REQUESTS</div>
        </li>
        <li className="cursor-pointer text-lg md:text-2xl text-center hover:bg-red-400 text-white w-full border-b-2">
          <div className="py-3 w-full">COMPLETED REQUESTS</div>
        </li>
        <li className="cursor-pointer text-lg md:text-2xl text-center hover:bg-red-400 text-white w-full border-b-2">
          <div className="py-3 w-full">SHOP REFURBISHED</div>
        </li>
      </ul>

      <h1 className="text-yellow-300 font-bold text-lg md:text-2xl text-center py-4 drop-shadow-lg animate-pulse">
        TEAM AURA
      </h1>
    </div>
  );
};

export default Sidebar;
