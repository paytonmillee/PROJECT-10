import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

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
    <Router>
      <Route exact path="/" component={Courses} />
      <Route exact path="/courses/:id" component={CourseDetail} />
      <Route exact path="/signin" component={UserSignIn} />
      <Route exact path="/signup" component={UserSignUp} />
      <Route exact path="/signout" component={UserSignOut} />
      <PrivateRoutes>
        <Route exact path="/courses/create" component={CreateCourse} />
        <Route exact path="/courses/:id/update" component={UpdateCourse} />
      </PrivateRoutes>
      <Redirect from="*" to="/" />
    </Router>
  );
};

export default App;
