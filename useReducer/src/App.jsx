import { useState, useReducer, useContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CounterContext, {
  useCounterValue,
  useCounterDispatch,
} from "./CounterContext,.jsx";

const Display = () => {
  // const [counter] = useContext(CounterContext);
  const counter = useCounterValue();
  return <div>{counter}</div>;
};

const Button = ({ type, label }) => {
  // const [counter, dispatch] = useContext(CounterContext);
  const dispatch = useCounterDispatch();
  return <button onClick={() => dispatch({ type })}>{label}</button>;
};

function App() {
  return (
    <>
      <Display />
      <div>
        {/* <button onClick={() => counterDispatch({ type: "INC" })}>+</button>
        <button onClick={() => counterDispatch({ type: "DEC" })}>-</button>
        <button onClick={() => counterDispatch({ type: "ZER0" })}>0</button> */}
        <Button type="INC" label="+" />
        <Button type="DEC" label="-" />
        <Button type="ZERO" label="0" />
      </div>
    </>
  );
}

export default App;
