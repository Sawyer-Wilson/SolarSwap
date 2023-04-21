import { Navigate } from 'react-router-dom';

// Prevent not logged in user from accessing private pages
function RequireAuth ({ children, authID }) {
  if (authID) {
    // If user IS logged in, allow them to access children pages
    return children;
  } else {
    // If user is NOT logged in, redirect them to login page
    return <Navigate to="/sign-in" replace/>
  }
};

// Prevent logged in user from accessing login / register pages
function PreventAuth ({ children, authID }) {
  if (authID) {
    // If user IS logged in, redirect them to their dashboard
    return <Navigate to="/dashboard" replace/>
  } else {
    // If user is NOT logged in, allow them to access children pages
    return children;
  }
};

export { RequireAuth, PreventAuth }