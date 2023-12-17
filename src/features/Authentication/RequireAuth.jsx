import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export function RequireAuth({ children }) {
  const { user } = useAuthContext();
  const { pathname } = useLocation();

  if (!user) {
    toast.error("Please login to access your inventory");
    return <Navigate to="/login" state={{ from: pathname }} />;
  }
  return children;
}
