import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import Header from "./Header";
import { Link, useParams, useHistory } from "react-router-dom";

// setting the courses and fetch the api

const Courses = () => {
  let [user] = useContext(UserContext);
  let [courses, setCourses] = React.useState(null);
  let { id } = useParams();
  let history = useHistory();
  // allowing to run things when component is loaded into the DOM
  React.useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    await fetch(`http://localhost:5000/api/courses`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((courses) => {
        // set data in state using React.useState()

        setCourses(courses);
      })
      .catch(
        (error) => {
          history.push("/");
          return () => {
            setCourses(null);
          };
        },
        [history, id]
      );
  };

  return (
    <div id="root">
      <Header user={user} />
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
