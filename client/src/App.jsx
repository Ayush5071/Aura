import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import SignUp from "./pages/Signup.jsx"
import { UserProvider } from './lib/userContext.jsx';
const App = () => {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </Router>
    </UserProvider>
  );
};

export default App;
