/* eslint-disable react/prop-types */
const Sidebar = ({ onLinkClick }) => {
  return (
    <div className="p-4">
      <ul className="mt-8">
        <li>
          <button 
            onClick={() => onLinkClick('profile')}
            className="block px-4 py-2 hover:bg-gray-700 w-full text-left"
          >
            Profile
          </button>
        </li>
        <li>
          <button 
            onClick={() => onLinkClick('requests')}
            className="block px-4 py-2 hover:bg-gray-700 w-full text-left"
          >
            Requests
          </button>
        </li>
        <li>
          <button 
            onClick={() => onLinkClick('myrequests')}
            className="block px-4 py-2 hover:bg-gray-700 w-full text-left"
          >
            My Requests
          </button>
        </li>
        <li>
          <button 
            onClick={() => onLinkClick('settings')}
            className="block px-4 py-2 hover:bg-gray-700 w-full text-left"
          >
            Settings
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
