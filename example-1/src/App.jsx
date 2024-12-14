import { useState } from "react";

import "./App.css";

import React from "react";

function Hello({ name, age }) {
  console.log(name);

  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, your age is {age}
      </p>
      <p>You are probobly born in {bornYear()}</p>
    </div>
  );
}

function App() {
  const name = "Peter";
  const age = 16;
  return (
    <div>
      <h1>Greeting</h1>
      <Hello name={name} age={age - 3} />
    </div>
  );
}

export default App;
