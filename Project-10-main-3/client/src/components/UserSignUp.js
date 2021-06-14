import React from "react";
import Header from "./Header";
import { Link, useHistory } from "react-router-dom";

const UserSignUp = () => {
  let history = useHistory();
  let [firstName, setFirstName] = React.useState("");
  let [lastName, setLastName] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [confirmPassword, setConfirmPassword] = React.useState("");

  const signUp = async (e) => {
    e.preventDefault();
    // confirming if passwords match

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return alert("All fields are required");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

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
        console.log(res);
        return res.json();
      })

      // if successfull persist user and push user to index page

      .then((userData) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.emailAddress,
            password: password,
          })
        );
        history.push("/");
      })

      // else show the error
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div id="root">
      <Header />
      <main>
        <div className="form--centered">
          <h2>Sign Up</h2>

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
              requried={true}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              requried={true}
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
              requried={true}
            />
            <label htmlFor="password">Password</label>
            <input
              minLength="6"
              id="password"
              requried={true}
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
              requried={true}
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
    </div>
  );
};

export default UserSignUp;
