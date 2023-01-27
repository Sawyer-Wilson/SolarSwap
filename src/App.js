import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';

function App() {
  const title = 'Hello'
  const link = "http://solarswap.net"
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className="content">
        <Home />
        <p> {title}</p>
        <a href={link}>Link to a site</a>
      </div>
    </div>
  );
}

export default App;
