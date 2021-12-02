import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import Header from "./Header";
import { Link, useHistory } from "react-router-dom";

const UserSignIn = () => {
  let [user, setUser] = useContext(UserContext);
  let history = useHistory();

  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [errors, setErrors] = React.useState(null);

  // when the user doesnt complete all necessary fields it will throw an error

  const signIn = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/api/users`, {
      method: "GET",
      mode: "cors",

      headers: {
        Authorization: "Basic " + btoa(`${email}:${password}`),
      },
    })
      .then((res) => {
        if (res.status === 401) {
          return setErrors([
            {
              message: "User Name or Password is incorrect",
            },
          ]);
        }
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
    <div>
      <Header user={user} />

      <main>
        <div className="form--centered">
          <h2>Sign In</h2>
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
              {/* when submitted the info will be sent to the database*/}
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
