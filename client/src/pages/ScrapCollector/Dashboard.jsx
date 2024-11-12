import React, { useState, useEffect } from "react";
import Sprofile from "../../components/SCDashboard/Sprofile";
import MyRequests from "../../components/SCDashboard/Myrequests";
import HistoryRequests from "../../components/SCDashboard/HistoryRequests";
import Sidebar from "../../components/SCDashboard/Sidebar";
import Settings from "../../components/SCDashboard/Settings";
import AllRequests from "../../components/SCDashboard/AllRequests";



const ScrapCollectorDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('profile');
  
  useEffect(() => {
    console.log("ScrapCollectorDashboard loaded.");
  }, []);

  const handleLinkClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-[18vw] bg-gray-800 text-white h-full">
        {/* <Navbar /> */}
        <Sidebar onLinkClick={handleLinkClick} />
      </div>

      <div className="flex-1 bg-gray-100 overflow-auto" style={{ width: '82vw' }}>
        {/* <Navbar /> */}
        <div className="p-6">
          {activeComponent === 'profile' && <Sprofile/>}
          {activeComponent === 'requests' && <AllRequests/>}
          {activeComponent === 'acceptedRequests' && <MyRequests/>}
          {activeComponent === 'history' && <HistoryRequests/>}
          {activeComponent === 'settings' && <Settings/>}
        </div>
      </div>
    </div>
  );
};

export default ScrapCollectorDashboard;
