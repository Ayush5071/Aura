import React, { useState } from 'react';
import Sidebar from '../../components/SCDashboard/Sidebar';
import Navbar from '../../components/landing-page/Navbar';
import Profile from '../../components/UserDashboard/Profile';

const CustomerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('');

  const handleLinkClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="flex h-screen">
      <div className="w-[18vw] bg-gray-800 text-white h-full">
        <Navbar />
        <Sidebar onLinkClick={handleLinkClick} />
      </div>

      <div className="flex-1 bg-gray-100 overflow-auto" style={{ width: '82vw' }}>
        <Navbar />
        <div className="p-6">
          {activeComponent === 'profile' && <Profile/>}
          {activeComponent === 'requests' && <div>Requests Section</div>}
          {activeComponent === 'myrequests' && <div>My Requests Section</div>}
          {activeComponent === 'settings' && <div>Settings Section</div>}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
