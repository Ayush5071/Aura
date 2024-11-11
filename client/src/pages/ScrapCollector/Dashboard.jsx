import React, { useState, useEffect } from "react";
import Sprofile from "../../components/SCDashboard/Sprofile";
import MyRequests from "../../components/SCDashboard/Myrequests";
import HistoryRequests from "../../components/SCDashboard/HistoryRequests";
import Sidebar from "../../components/SCDashboard/Sidebar";

// import Navbar from "../../components/landing-page/Navbar";

const ScrapCollectorDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('profile');
  
  useEffect(() => {
    // Placeholder text to show on dashboard (just for now)
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

      {/* Main content area */}
      <div className="flex-1 bg-gray-100 overflow-auto" style={{ width: '82vw' }}>
        {/* <Navbar /> */}
        <div className="p-6">
          {/* Just display some placeholder text based on the active component */}
          {activeComponent === 'profile' && <Sprofile/>}
          {activeComponent === 'requests' && <div>All Requests - Placeholder</div>}
          {activeComponent === 'acceptedRequests' && <MyRequests/>}
          {activeComponent === 'history' && <HistoryRequests/>}
          {activeComponent === 'settings' && <div>Settings - Placeholder</div>}
        </div>
      </div>
    </div>
  );
};

export default ScrapCollectorDashboard;
