import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const Display = ({ counter }) => {
  return <div>{counter}</div>;
};

const Button = ({ onSmash, text }) => {
  return <button onClick={onSmash}> {text}</button>;
};

function App() {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    alert("Clicked");
  };

  // setTimeout(() => {
  //   setCounter(counter + 1);
  // }, 1000);
  // console.log("Rendering....", counter);

  console.log("rendering with counter value", counter);

  const increaseByOne = () => {
    setCounter(counter + 1);
    console.log("increasing value before", counter);
  };
  const setToZero = () => {
    console.log("reseting to zero, value before", counter);
    setCounter(0);
  };
  const decreaseByOne = () => {
    setCounter(counter - 1);
    console.log("increasing value before", counter);
  };

  return (
    <div>
      <Display counter={counter} />
      <Button onSmash={increaseByOne} text="Increase By One" />
      <Button onSmash={setToZero} text="Reset" />
      <Button onSmash={decreaseByOne} text="Minus" />
    </div>
  );
}

export default App;
