import { Link } from "react-router-dom";

// navagation bar component
function Navbar(){
  return (
    <nav>
      <h1 id="nav-title">
        <Link to="/">SolarSwap</Link>
      </h1>
      <div>
        <Link to="/buyer">Buyer</Link>
        <Link to="/seller">Seller</Link>
      </div>
    </nav>
  );
}

export default Navbar;
