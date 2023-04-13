import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from 'axios';
import { RequireAuth, PreventAuth } from '@utils/auth';
import Navbar from '@components/NavBar/Navbar';
import Home from '@views/Home/Home'
import IWantSolar from '@views/IWantSolar/IWantSolar'
import IHaveSolar from '@views/IHaveSolar/IHaveSolar'
import GetStarted from "./views/GetStarted/GetStarted";
import Login from '@views/Login/Login'
import Register from '@views/Register/Register'
import Dashboard from '@views/Dashboard/Dashboard'
import Error from '@views/Error/Error'
import PageNotFound from '@views/PageNotFound/PageNotFound'

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
        <div className="bg-white min-h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="i-want-solar" element={<IWantSolar />} />
            <Route path="i-have-solar" element={<IHaveSolar />} />
            <Route path="get-started" element={<GetStarted authID={ authID }/>} />
            <Route path="error" element={<Error/>} />

            {/* Routes only for un-authenticated users */}
            <Route path="login" element={
              <PreventAuth authID={ authID }>
                <Login setAuthID={ setAuthID }/>
              </PreventAuth>}/>
            <Route path="register" element={
              <PreventAuth authID={ authID }>
                <Register authID={ authID } setAuthID={ setAuthID }/>
              </PreventAuth>}/>

            {/* Protected Routes */}
            <Route path="dashboard" element={
              <RequireAuth authID={ authID }>
                <Dashboard authID={ authID }/>
              </RequireAuth>}/>
            
            {/* Catch All */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
