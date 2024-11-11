import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import UserLogin from './pages/customer-auth/Login.jsx';
import UserSignup from './pages/customer-auth/Signup.jsx';
import ScrapLogin from './pages/ScrapCollector/Login.jsx';
import ScrapCollectorDashboard from './pages/ScrapCollector/Dashboard.jsx';
import CustomerDashboard from './pages/customer/Dashboard.jsx';
import SignupCard from './pages/ScrapCollector/SignUpCard.jsx';

const App = () => {
  return (

<Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Routes for Customer */}
        <Route path="/customer">
          <Route path="login" element={<UserLogin />} />
          <Route path="signup" element={<UserSignup />} />
          <Route path="dashboard" element={<CustomerDashboard/>} />
        </Route>

        {/* Routes for Scrap Collector */}
        <Route path="/scrapcollector">
          <Route path="login" element={<ScrapLogin />} />
          <Route path="signup" element={<SignupCard />} />
          <Route path="dashboard" element={<ScrapCollectorDashboard />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default App;