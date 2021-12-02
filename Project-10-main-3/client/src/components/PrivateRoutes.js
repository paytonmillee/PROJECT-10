import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";
//sets Private Routes
const PrivateRoutes = ({ children, ...otherProps }) => {
  let [user] = useContext(UserContext);
  return (
    <Route
      {...otherProps}
      render={(props) => (user !== null ? children : <Redirect to="/signin" />)}
    />
  );
};

export default PrivateRoutes;
