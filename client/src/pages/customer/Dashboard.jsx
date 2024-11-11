import React, { useState } from 'react';
import Sidebar from '../../components/UserDashboard/Sidebar';
import Navbar from '../../components/landing-page/Navbar';
import Profile from '../../components/UserDashboard/Profile';
import CreateRequest from '../../components/UserDashboard/CreateRequest';
// import { useUser } from '../../context/userContext';


const CustomerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('');
  // const { user } = useUser();

  const handleLinkClick = (component) => {
    setActiveComponent(component);
  };

  // console.log(user,"user aa rha hai ?");

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
          {activeComponent === 'requests' && <CreateRequest/>}
          {activeComponent === 'myrequests' && <div>My Requests Section</div>}
          {activeComponent === 'settings' && <div>Settings Section</div>}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
