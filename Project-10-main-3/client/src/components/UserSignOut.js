import React from "react";
import { Redirect } from "react-router-dom";

//This will end up signing out the user and redirects them back to the home screen

const UserSignOut = () => {
  localStorage.setItem("user", null);
  return <Redirect to={"/"} />;
};

export default UserSignOut;
