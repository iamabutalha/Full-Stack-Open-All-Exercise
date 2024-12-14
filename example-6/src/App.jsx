import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [timeInSec, setTimeInSec] = useState(300);
  const [countDown, setCountDown] = useState();

  function startCountDown() {
    if (countDown) return;
    let count = setInterval(() => {
      setTimeInSec((prevTimeInSec) => {
        if (prevTimeInSec > 0) {
          console.log(prevTimeInSec);
          return prevTimeInSec - 1;
        } else {
          clearInterval(count);
          alert("Times Out");
          return 0;
        }
      });
    }, 1000);
    setCountDown(count);
  }
  console.log(countDown);

  function updateTimeDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remaningSeconds = seconds % 60;

    return (
      <p className="timer">
        {`${minutes.toString().padStart(2, "0")}:
        ${remaningSeconds.toString().padStart(2, "0")}`}
      </p>
    );
  }

  function stopCountDown() {
    if (countDown) {
      clearInterval(countDown);
      setCountDown(null);
    }
  }

  function startButtonHandler() {
    stopCountDown();
    startCountDown();
  }

  function resetCountDown() {
    stopCountDown();
    setTimeInSec(300);
  }
  return (
    <>
      <h2>Count Down Timer</h2>
      {updateTimeDisplay(timeInSec)}
      <p className="minutes">minutes</p>
      <button className="start-button" onClick={startButtonHandler}>
        start
      </button>
      <button className="stop-button" onClick={stopCountDown}>
        stop
      </button>
      <button className="reset-button" onClick={resetCountDown}>
        Reset
      </button>
    </>
  );
}

export default App;
