import { useState } from 'react';
// import Profile from './Profile';
// import Requests from './Requests';
// import MyRequests from './MyRequests';
// import Settings from './Settings';
import Sidebar from '../../components/SCDashboard/Sidebar';
import Navbar from '../../components/SCDashboard/Navbar';

const ScrapCollectorDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('profile');

  const handleLinkClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="flex h-screen">
      <div className="w-[18vw] bg-gray-800 text-white h-full">
        <Sidebar onLinkClick={handleLinkClick} />
      </div>

      <div className="flex-1 bg-gray-100 overflow-auto" style={{ width: '82vw' }}>
        <Navbar />
        {/* <div className="p-6">
          {activeComponent === 'profile' && <Profile />}
          {activeComponent === 'requests' && <Requests />}
          {activeComponent === 'myrequests' && <MyRequests />}
          {activeComponent === 'settings' && <Settings />}
        </div> */}
      </div>
    </div>
  );
};

export default ScrapCollectorDashboard;
