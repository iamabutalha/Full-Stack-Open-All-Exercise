import { useState } from "react";

import "./App.css";

const Course = (props) => {
  const { course } = props;
  console.log("Course, course", course);

  return <div>{course}</div>;
};

function App() {
  const course = {
    name: "Full Stack Open",
  };

  console.log("App working...");

  return (
    <div>
      <Course course={course.name} />
    </div>
  );
}

export default App;
