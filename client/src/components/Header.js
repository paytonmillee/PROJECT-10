import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";

// sets the Header

const Header = () => {
  let [user] = useContext(UserContext);
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <a href="index.html">Courses</a>
        </h1>
        {user ? (
          <nav>
            <ul className="header--signedin">
              <li>
                Welcome, {user.firstName} {user.lastName}!
              </li>
              <li>
                <Link to="/signout">Sign Out</Link>
              </li>
            </ul>
          </nav>
        ) : (
          <nav>
            <ul className="header--signedout">
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
