import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { UserProvider } from "./components/UserContext";

//import routes

import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import PrivateRoutes from "./components/PrivateRoutes";

//Set exact paths

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Route exact path="/">
          <Courses />
        </Route>
        <Route exact path="/courses/:id">
          <CourseDetail />
        </Route>
        <PrivateRoutes exact path="/courses/create">
          <CreateCourse />
        </PrivateRoutes>
        <PrivateRoutes exact path="/courses/:id/update">
          <UpdateCourse />
        </PrivateRoutes>
        <Route exact path="/signup">
          <UserSignUp />
        </Route>
        <Route exact path="/signout">
          <UserSignOut />
        </Route>
        <Route exact path="/signin">
          <UserSignIn />
        </Route>
        <Redirect from="*" to="/" />
      </Router>
    </UserProvider>
  );
};

export default App;
