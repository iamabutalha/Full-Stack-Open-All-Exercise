import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const Hello = (props) => {
  console.log(props);

  return (
    <p>
      Hello {props.name}, your are {props.age} year old
    </p>
  );
};

const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/iamabutalha">Talha</a>
    </div>
  );
};

function App() {
  console.log("Hello from App");
  const now = new Date();
  const a = 10;
  const b = 20;

  console.log(a + b);
  let name = "peter";
  let age = 10;

  const friends = [
    { name: "Peter", age: 4 },
    { name: "Maya", age: 10 },
  ];

  return (
    <>
      <div>
        <p>Hello World it is {now.toString()}</p>
        <p>
          {a} plus {b} = {a + b}
        </p>
        <Hello name="Talha" age={19} />
        <Hello name="Faiz" age={1} />
        <Hello name={name} age={age + 5} />
      </div>

      <p>
        {friends[0].name} {friends[0].age}
      </p>

      <Footer />
    </>
  );
}

export default App;
