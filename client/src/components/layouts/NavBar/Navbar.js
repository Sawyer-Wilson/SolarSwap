import { NavLink } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import QuickActions from "./QuickActions";

// navbar links
const navLinks = [
  { name: 'Home', path: '/'},
  { name: 'Energy Listings', path: '/buyer'},
  { name: 'Sellers', path: '/seller'}
]

// navigation bar component
const Navbar = ({ authID, setAuthID }) => {
  return ( 
    <nav className="bg-gray-800 mx-auto px-6 h-16 flex justify-between items-center">

      {/* Logo and Links container */}
      <div className="flex space-x-4 items-center">

        {/* Logo */}
        <div className="px-3 py-2 text-white text-xl font-medium">
          <p>SolarSwap</p>
        </div>

        {/* Main Nav Bar Links */}
        <div className="flex space-x-4">
          { navLinks.map((link) => (
            <NavLink
              key={ link.name }
              to={ link.path }
              className={({ isActive }) => isActive ? 
                'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium' :
                'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}>
              { link.name }
            </NavLink>
          )) }
        </div>
      </div>

      {/* Display either Profile dropdown or Quick Actions */}
      { authID ? <ProfileDropdown setAuthID={ setAuthID }/> : <QuickActions/> }
    </nav>
   );
}

export default Navbar;
