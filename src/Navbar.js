import './navbar.css';

// navagation bar component
function Navbar(){
  return (
    <nav className="navbar">
      <h1 id="nav-title">
        <a href="/">SolarSwap</a>
      </h1>
      <div className="links">
        <a href="/create"> Buyer</a>
        <a href="/create"> Seller</a>
      </div>
    </nav>
  );
}

export default Navbar;
