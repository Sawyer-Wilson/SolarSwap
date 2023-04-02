import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from 'axios';
import { RequireAuth, PreventAuth } from '@utils/auth';
import Navbar from '@components/layouts/NavBar/Navbar';
import Home from '@views/Home/Home'
import Buyer from '@views/Buyer/Buyer'
import Seller from '@views/Seller/Seller'
import Login from '@views/Login/Login'
import Register from '@views/Register/Register'
import Dashboard from '@views/Dashboard/Dashboard'
import Error from '@views/Error/Error'

function App() {
  // Will either be changed to FALSE or hold the logged in users ID
  const [authID, setAuthID] = useState(null);

  // Check if there is a user currently logged in or not
  useEffect(() => {
    async function fetchUser() {
      const userID = (await axios.get('/auth/current-session')).data;
      setAuthID(userID);
    }
    fetchUser();
  }, [])

  // Wait for user session to be fetched before rendering page
  if (authID === null) {
    return <></>
  }

  return (
    <Router>
      <>
        <Navbar authID={ authID } setAuthID={ setAuthID } />
        <div className="bg-white h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="buyer" element={<Buyer />} />
            <Route path="seller" element={<Seller />} />
            <Route path="error" element={<Error/>} />

            {/* Routes only for un-authenticated users */}
            <Route path="login" element={
              <PreventAuth authID={ authID }>
                <Login setAuthID={ setAuthID }/>
              </PreventAuth>}/>
            <Route path="register" element={
              <PreventAuth authID={ authID }>
                <Register setAuthID={ setAuthID }/>
              </PreventAuth>}/>

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
