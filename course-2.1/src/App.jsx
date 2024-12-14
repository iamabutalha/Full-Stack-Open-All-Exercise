import { useState } from "react";
import "./App.css";
import Content from "./components/Content.jsx";
import Header from "./components/Header.jsx";

function App() {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  let total = courses[0].parts.reduce((sum, part) => {
    return (sum += part.exercises);
  }, 0);
  console.log(total);

  let total2 = courses[1].parts.reduce((sum, part) => {
    return (sum += part.exercises);
  }, 0);
  console.log(total2);

  return (
    <div>
      <h1>Course Curriculum</h1>
      <Header courseName={courses[0].name} />
      <Content
        part1={courses[0].parts[0].name}
        exercises1={courses[0].parts[0].exercises}
        part2={courses[0].parts[1].name}
        exercises2={courses[0].parts[1].exercises}
        part3={courses[0].parts[2].name}
        exercises3={courses[0].parts[2].exercises}
        part4={courses[0].parts[3].name}
        exercises4={courses[0].parts[3].exercises}
      />
      <strong>total of {total} Execercises</strong>

      <Header courseName={courses[1].name} />
      <Content
        part1={courses[1].parts[0].name}
        exercises1={courses[1].parts[0].exercises}
        part2={courses[1].parts[1].name}
        exercises2={courses[1].parts[1].exercises}
      />
      <strong>total of {total2} Execercises</strong>
    </div>
  );
}

export default App;
