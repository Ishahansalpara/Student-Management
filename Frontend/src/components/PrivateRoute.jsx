import { Navigate } from "react-router-dom";

function PrivateRoute({ user, requiredRole, children }) {
  // Redirect if no user is logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect if user role doesn’t match required role
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render protected component
  return children;
}

export default PrivateRoute;
