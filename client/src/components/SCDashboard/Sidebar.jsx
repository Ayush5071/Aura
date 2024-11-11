import React from 'react';

const Sidebar = ({ onLinkClick }) => {
  return (
    <div className="p-4">
      <ul className="mt-8">
        <li>
          <button 
            onClick={() => onLinkClick('profile')}
            className="block px-4 py-2 hover:bg-zinc-700 w-full text-left text-white"
          >
            Profile
          </button>
        </li>
        <li>
          <button 
            onClick={() => onLinkClick('requests')}
            className="block px-4 py-2 hover:bg-zinc-700 w-full text-left text-white"
          >
            All Requests
          </button>
        </li>
        <li>
          <button 
            onClick={() => onLinkClick('acceptedRequests')}
            className="block px-4 py-2 hover:bg-zinc-700 w-full text-left text-white"
          >
            Accepted Requests
          </button>
        </li>
        <li>
          <button 
            onClick={() => onLinkClick('history')}
            className="block px-4 py-2 hover:bg-zinc-700 w-full text-left text-white"
          >
            History
          </button>
        </li>
        <li>
          <button 
            onClick={() => onLinkClick('settings')}
            className="block px-4 py-2 hover:bg-zinc-700 w-full text-left text-white"
          >
            Settings
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
