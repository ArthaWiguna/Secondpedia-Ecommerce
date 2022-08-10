import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let auth =
    localStorage.getItem("user") !== null &&
    localStorage.getItem("token") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";
  console.log(auth);
  return auth !== "" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
