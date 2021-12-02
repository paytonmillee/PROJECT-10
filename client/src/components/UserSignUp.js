import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import Header from "./Header";
import { Link, useHistory } from "react-router-dom";

const UserSignUp = () => {
  let [user, setUser] = useContext(UserContext);
  let history = useHistory();
  let [firstName, setFirstName] = React.useState("");
  let [lastName, setLastName] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [confirmPassword, setConfirmPassword] = React.useState("");
  let [errors, setErrors] = React.useState("");

  const signUp = async (e) => {
    e.preventDefault();

    // calling the api to create user
    fetch(`http://localhost:5000/api/users`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        emailAddress: email,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((userData) => {
        if (userData.errors) {
          return setErrors(userData.errors);
        }
        setUser({
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.emailAddress,
          password: password,
        });
        history.push("/");
      })
      .catch((error) => {});
  };
  return (
    <div id="root">
      <Header user={user} />
      <main>
        <div className="form--centered">
          <h2>Sign Up</h2>
          {errors && (
            <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                {/* map errors */}
                {errors.map((error) => {
                  return <li>{error.message}</li>;
                })}
              </ul>
            </div>
          )}
          <form
            onSubmit={(e) => {
              signUp(e);
            }}
          >
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required={true}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required={true}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="emailAddress">Email Address</label>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
            <label htmlFor="password">Password</label>
            <input
              minLength="6"
              id="password"
              required={true}
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={true}
            />
            <button className="button" type="submit">
              Sign Up
            </button>
            <button
              className="button button-secondary"
              onClick={() => {
                history.push("/");
              }}
            >
              Cancel
            </button>
          </form>
          <p>
            Already have a user account? Click here to{" "}
            <Link to="/signin">sign in</Link>!
          </p>
        </div>
      </main>
      let error = error.length ? : return
    </div>
  );
};
export default UserSignUp;
