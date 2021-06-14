import React from "react";
import { Redirect } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  let user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Redirect to={"/signin"} />;
};

export default PrivateRoutes;
