import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from '@layouts/NavBar/Navbar';
import Home from '@Home/Home'
import Buyer from '@Buyer/Buyer'
import Seller from '@Seller/Seller'
import Register from '@Register/Register'
import Dashboard from '@Dashboard/Dashboard'

// wrapper for navbar and page contents
function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="buyer" element={<Buyer />} />
            <Route path="seller" element={<Seller />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
