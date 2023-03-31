import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, authID }) => {
  if (authID === null) {
    // Waiting for user session to be fetched
    return <></>
  } else if (authID) {
    // If user IS logged in, allow them to access children pages
    return children;
  } else {
    // If user is NOT logged in, redirect them to login page
    return <Navigate to="/login" replace/>
  }
};

export default RequireAuth;