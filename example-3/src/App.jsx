import { useState } from "react";
import "./App.css";

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }

  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const Button = (props) => {
  console.log("Button props", props);
  const { handleClick, text } = props;

  return <button onClick={handleClick}>{text}</button>;
};

/* function App() {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAllClicks] = useState([]);
  const [total, setTotal] = useState(0);

  // const [clicks, setClicks] = useState({
  //   left: 0,
  //   right: 0,
  // });

  const handleLeftClick = () => {
    setAllClicks(allClicks.concat("L"));
    console.log("left before", left);

    const updateLeft = left + 1;

    setLeft(updateLeft);
    console.log("left after", left);

    setTotal(updateLeft + right);

    // const newClick = {
    //   ...clicks,
    //   left: clicks.left + 1,
    // };

    // setClicks({ ...clicks, left: clicks.left + 1 });
  };

  const handleRightClick = () => {
    // const newClick = {
    //   ...clicks,
    //   right: clicks.right + 1,
    // };
    // setClicks({ ...clicks, right: clicks.right + 1 });
    setAllClicks(allClicks.concat("R"));
    const handleRight = right + 1;
    setRight(handleRight);
    setTotal(handleRight + left);
  };

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text="left" />
      <Button handleClick={handleRightClick} text="Right" />
      {right}
      {/* <p>{allClicks.join(" ")}</p>
      <p>{total}</p> 

      <History allClicks={allClicks} />
    </div>
  );
}
*/

/*
function App() {
  let [value, setValue] = useState(10);


const hello = (who) => {
  const handler = () => {
    console.log('hello', who)
  }
  return handler
}

return (
  <div>
    {value}
    <button onClick={hello('world')}>button</button>
    <button onClick={hello('react')}>button</button>
    <button onClick={hello('function')}>button</button>
  </div>
  */

const Display = ({ value }) => <div>{value}</div>;

function App() {
  let [value, setValue] = useState(10);

  const setToValue = (newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Display value={value} />
      {value}
      <button onClick={() => setToValue(100)}>Set Value to zero</button>
      <button onClick={() => setToValue(98)}>Set Value to zero</button>
      <button onClick={() => setToValue(9876)}>Set Value to zero</button>
    </div>
  );
}
export default App;
