import { Navigate, Outlet } from "react-router";
import { useUserStore } from "../store/useUserStore";
import { useLayoutEffect, useState } from "react";

const ProtectedRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isTokenValid, validToken, token } = useUserStore();

  useLayoutEffect(() => {
    isTokenValid();
    setIsLoading(false);

  }, [token,validToken]);

  if (isLoading) {
    //spinner
    return (
      <div className="flex h-screen w-full items-center justify-center bg-primary-700">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
          <p className="text-text-color font-medium">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  if (!validToken) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;