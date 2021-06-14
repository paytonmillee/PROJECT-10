import React from "react";
import Header from "./Header";
import { Link, useHistory } from "react-router-dom";

const UserSignIn = () => {
  let history = useHistory();

  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");

  // If the user has not completed filling out all the fields they will recieve an error.

  const signIn = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("All Fields Are Required");
    }
    fetch(`http://localhost:5000/api/users`, {
      method: "GET",
      mode: "cors",

      headers: {
        Authorization: "Basic " + btoa(`${email}:${password}`),
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
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
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Header />
      <main>
        <div className="form--centered">
          <h2>Sign In</h2>

          <form
            onSubmit={(e) => {
              signIn(e);
            }}
          >
            <label htmlFor="emailAddress">Email Address</label>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button" type="submit">
              {/* On submit the user will be signed in and the information will be pushed to the database */}
              Sign In
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
            Don't have a user account? Click here to{" "}
            <Link to="/signup">sign up</Link>!
          </p>
        </div>
      </main>
    </div>
  );
};
export default UserSignIn;
