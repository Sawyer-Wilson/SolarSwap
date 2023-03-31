import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from 'axios';
import RequireAuth from '@utils/RequireAuth';
import Navbar from '@components/layouts/NavBar/Navbar';
import Home from '@views/Home/Home'
import Buyer from '@views/Buyer/Buyer'
import Seller from '@views/Seller/Seller'
import Login from '@views/Login/Login'
import Register from '@views/Register/Register'
import Dashboard from '@views/Dashboard/Dashboard'

function App() {
  // Will either be changed to FALSE or hold the logged in users ID
  const [authID, setAuthID] = useState(null);

  // Check if there is a user currently logged in or not
  useEffect(() => {
    async function fetchUser() {
      const userID = await axios.get('/auth/current-session');
      setAuthID(userID);
    }
    fetchUser();
  }, [])

  return (
    <Router>
      <>
        <Navbar authID={ authID }/>
        <div className="bg-white h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="buyer" element={<Buyer />} />
            <Route path="seller" element={<Seller />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="dashboard" element={
              <RequireAuth authID={ authID }>
                <Dashboard authID={ authID }/>
              </RequireAuth>}/>
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
