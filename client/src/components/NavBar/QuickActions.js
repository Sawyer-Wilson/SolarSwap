import { NavLink } from "react-router-dom";

// Quick Actions link information
const quickActions = [
  { name: 'Register', path: '/register'},
  { name: 'Login', path: '/login'}
]

const QuickActions = () => {
  return ( 
    <div className="flex space-x-3">

      {/* Quick Action links */}
      { quickActions.map((action) => (
          <NavLink 
            key= { action.name }
            to={ action.path }
            className='bg-red-light text-white hover:bg-red-dark hover:text-grey-300 rounded-md px-3 py-2 text-sm font-medium'>
            { action.name }
          </NavLink>
      )) }
    </div>
  );
}
 
export default QuickActions;