import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import React from "react";

function Header(props) {
  console.log(props);
  return <h1>{props.course}</h1>;
}

function Content(props) {
  return (
    <>
      <Part part={props.part1} excercise={props.excercise1} />
      <Part part={props.part2} excercise={props.excercise2} />
      <Part part={props.part3} excercise={props.excercise3} />
    </>
  );
}

function Part(props) {
  console.log(props);

  return (
    <p>
      {props.part} {props.excercise}
    </p>
  );
}

function Total(props) {
  return (
    <p>
      Number of excercise{" "}
      {props.excercise1 + props.excercise2 + props.excercise3}
    </p>
  );
}

function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamental of React",
        excercise: 10,
      },

      {
        name: "Using propsto pass data",
        excercise: 7,
      },

      {
        name: "State of a component",
        excercise: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content
        part1={course.parts[0].name}
        part2={course.parts[1].name}
        excercise1={course.parts[0].excercise}
        excercise2={course.parts[1].excercise}
        // We used part[2] as it is 3 in the array index
        part3={course.parts[2].name}
        excercise3={course.parts[2].excercise}
      />
      {
        <Total
          excercise1={course.parts[0].excercise}
          excercise2={course.parts[1].excercise}
          excercise3={course.parts[2].excercise}
        />
      }
    </div>
  );
}

export default App;
