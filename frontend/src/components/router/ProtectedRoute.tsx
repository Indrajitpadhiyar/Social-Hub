import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: JSX.Element;
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // अगर लॉगिन नहीं है तो Hero पर redirect
  }
  return children;
};

export default ProtectedRoute;
