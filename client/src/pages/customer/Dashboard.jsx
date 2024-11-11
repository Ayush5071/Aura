import  { useState } from 'react';
import Sidebar from '../../components/SCDashboard/Sidebar';
import Navbar from '../../components/UserDashboard/Navbar';
import Profile from '../../components/UserDashboard/Profile';
import Request from '../../components/UserDashboard/Request';
import ScheduleList from '../../components/UserDashboard/ScheduleList';

const CustomerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('');

  const handleLinkClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="flex h-screen">
      <div className="w-[18vw]  bg-gray-800 text-white h-full">
        <Sidebar onLinkClick={handleLinkClick} />
      </div>

      <div className="flex-1 bg-gray-100 overflow-auto" style={{ width: '82vw' }}>
        <Navbar/>
        <div className="p-6">
          {activeComponent === 'profile' && <Profile/>}
          {activeComponent === 'requests' && <div><Request/></div>}
          {activeComponent === 'myrequests' && <div><ScheduleList/></div>}
          {activeComponent === 'settings' && <div>Settings Section</div>}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
