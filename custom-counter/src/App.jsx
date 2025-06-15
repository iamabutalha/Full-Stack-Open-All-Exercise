import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const useCounter = () => {
  const [value, setValue] = useState(0);

  const increase = () => {
    setValue(value + 1);
  };

  const decrease = () => {
    setValue(value - 1);
  };

  const zero = () => {
    setValue(0);
  };

  return {
    value,
    increase,
    decrease,
    zero,
  };
};

const useFiled = (type) => {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

function App() {
  // const [name, setName] = useState("");
  // const [born, setBorn] = useState("");
  // const [height, setHeight] = useState("");

  const name = useFiled("text");
  const born = useFiled("date");
  const height = useFiled("number");

  return (
    <div>
      <form>
        name: <input {...name} />
        <br />
        birthDate:
        <input {...born} />
        <br />
        height:
        <input {...height} />
      </form>
      <div>
        Name:{name.value} DOB:{born.value} {height.value}cm
      </div>
    </div>
  );
}

// function App() {
//   const counter = useCounter();
//   const left = useCounter();
//   const right = useCounter();
//   return (
//     <>
//       <div>{counter.value}</div>
//       <button onClick={counter.increase}>+</button>
//       <button onClick={counter.decrease}>-</button>
//       <button onClick={counter.zero}></button>
//       <div>{left.value}</div>
//       <button onClick={left.increase}>left {left.value}</button>
//       <div>{right.value}</div>
//       <button onClick={right.increase}>right {right.value}</button>
//     </>
//   );
// }

export default App;
