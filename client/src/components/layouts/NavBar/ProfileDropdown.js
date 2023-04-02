import { Menu, Transition } from '@headlessui/react';
import profileIcon from './profile-icon.png';
import { Link, useNavigate} from "react-router-dom";
import axios from 'axios';

const ProfileDropdown = ({ setAuthID }) => {
  const navigate = useNavigate();

  const onLogout = async () => {
    // Call auth login endpoint to log user out
    try {
      const response = await axios.post('/auth/logout');

      if (response.status === 200) {
        setAuthID(false);
        navigate('/login');
      }
    } catch (error) {
      navigate('/error');
      console.log('Logout error: ', error);
    }
  }

  return ( 
    <Menu as="div" className="relative ml-3">

      {/* Profile icon button that opens dropdown */}
      <Menu.Button className="flex rounded-full bg-gray-800 text-sm">
        <img className="h-8 w-8 rounded-full" 
              src={ profileIcon } 
              alt="Profile Icon"/>
      </Menu.Button>

      {/* Open dropdown smoothly with transition */}
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {/* Dropdown menu links */}
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg">
          <Menu.Item>{({ active }) => (
            <Link to='/dashboard'
                  className={active ? 
                    'bg-gray-100 block px-4 py-2 text-sm text-gray-700' : 
                    'block px-4 py-2 text-sm text-gray-700'}>
                Dashboard
            </Link>
          )}</Menu.Item>
          <Menu.Item>{({ active }) => (
            <button onClick={ onLogout }
              className={active ? 
                'bg-gray-100 block px-4 py-2 text-sm text-gray-700 w-full text-left' : 
                'block px-4 py-2 text-sm text-gray-700 w-full text-left'}>
                Logout
            </button>
          )}</Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
 
export default ProfileDropdown;
