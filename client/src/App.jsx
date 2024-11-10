import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/Signup.jsx';
import ScrapCollectorDashboard from './pages/ScrapCollector/Dashboard.jsx';
import CustomerDashboard from './pages/customer/Dashboard.jsx';

const App = () => {
  return (

<Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Routes for Customer */}
        <Route path="/customer">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="dashboard" element={<CustomerDashboard/>} />
        </Route>

        {/* Routes for Scrap Collector */}
        <Route path="/scrapcollector">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="dashboard" element={<ScrapCollectorDashboard />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default App;

// Customer Routes:
// /customer/login: Login page for customers.
// /customer/signup: Sign-up page for customers.
// /customer/dashboard: Dashboard for customers.
// /customer/profile: Profile page for customers.
// Scrap Collector Routes:
// /scrapcollector/login: Login page for scrap collectors.
// /scrapcollector/signup: Sign-up page for scrap collectors.
// /scrapcollector/dashboard: Dashboard for scrap collectors.
// /scrapcollector/profile: Profile page for scrap collectors.