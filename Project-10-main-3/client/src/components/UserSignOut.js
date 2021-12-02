import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { Redirect } from "react-router-dom";

//Signs out user and will take them to the homescreen

const UserSignOut = () => {
  let [user, setUser] = useContext(UserContext);
  React.useEffect(() => {
    if (user) {
      setUser(null);
    }
  }, [user, setUser]);
  return <Redirect to={"/"} />;
};

export default UserSignOut;
