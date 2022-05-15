import React from "react";
import { Outlet } from "react-router-dom";
import AuthenticationService from "../../api/authentication/AuthenticationService";
import { Navigate } from "react-router-dom";

const useAuth = () => {
  return AuthenticationService.isAdminLoggedIn();
};
const ProtectedRoutesAdmin = () => {
  const isAuth = useAuth();
  console.log("isAuth" + isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutesAdmin;
