import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/layout/NavBar/Navbar';
import Home from './views/Home/Home'
import Buyer from './views/Buyer/Buyer'
import Seller from './views/Seller/Seller'

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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
