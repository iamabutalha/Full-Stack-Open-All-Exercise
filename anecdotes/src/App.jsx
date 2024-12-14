import { useState } from "react";
import "./App.css";

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  let [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [highestVoted, setHigestVoted] = useState(null);
  const copy = [...points];
  console.log(copy);
  console.log(selected);

  const randomSelect = () => {
    return Math.floor(Math.random() * 8);
  };

  // function voting() {
  //   let newCopy = [];
  //   copy.forEach((item) => {
  //     if (item[selected]) {
  //       item[selected] += 1;
  //       newCopy.push(item);
  //     } else {
  //       newCopy.push(item);
  //     }
  //   });

  //   return newCopy;
  // }

  // first take higest value in the copy array
  let highestValue = Math.max(...copy);
  console.log(highestValue);
  // Then take the index of that value in from copy array
  let higestIndex = copy.indexOf(highestValue);
  console.log(higestIndex);

  return (
    <>
      <div>{anecdotes[selected]}</div>
      <p>has {copy[selected]} votes</p>
      <button
        onClick={() => {
          const newPoint = [...points];
          newPoint[selected] += 1;
          setPoints(newPoint);
        }}
      >
        Vote
      </button>
      <button onClick={() => setSelected(randomSelect)}>Next</button>

      <h1>Anecdote with most votes</h1>
      {/* Finally return the quote from anecdotes array on the higest value(votes) index*/}
      <p>{anecdotes[higestIndex]}</p>

      <p>has {highestValue} votes</p>
    </>
  );
}

export default App;
