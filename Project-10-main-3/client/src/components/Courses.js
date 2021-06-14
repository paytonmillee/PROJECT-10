import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const Courses = () => {
  let [courses, setCourses] = React.useState(null);
  // useEffect allows us to run the app when the component is loaded into the DOM
  React.useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    await fetch(`http://localhost:5000/api/courses`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Authorization: "Basic " + btoa("john@smith.com:password"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((courses) => {
        console.log(courses);
        setCourses(courses);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="root">
      <Header />
      <main>
        <div className="wrap main--grid">
          {courses &&
            courses.length &&
            courses.map((course, index) => {
              return (
                <Link
                  key={index}
                  className="course--module course--link"
                  to={`/courses/${course.id}`}
                >
                  <h2 className="course--label">Course</h2>
                  <h3 className="course--title">{course.title}</h3>
                </Link>
              );
            })}

          <Link
            className="course--module course--add--module"
            to="/courses/create"
          >
            <span className="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                className="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Courses;
