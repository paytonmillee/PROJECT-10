import React from "react";
import { Link } from "react-router-dom";

//sets my header

const Header = () => {
  let user = JSON.parse(localStorage.getItem("user"));
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
