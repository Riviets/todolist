import { useEffect, useState, type ReactNode } from "react";
import { authService } from "../../services/api/authService";
import { Navigate } from "react-router-dom";
import Spinner from "./Spinner";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        await authService.getCurrentUser();
        setIsUserLoggedIn(true);
      } catch {
        setIsUserLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    getCurrentUser();
  }, []);
  if (isLoading)
    return (
      <div className="h-screen bg-gradient flex-center">
        <Spinner />
      </div>
    );
  return isUserLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
