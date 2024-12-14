import { useState } from "react";
import "./App.css";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const StatasticsLine = (props) => {
  return (
    <p>
      {props.text} {props.value}
    </p>
  );
};

const Statastics = (props) => {
  if (!props.good && !props.neutral && !props.bad) {
    return <h1>Please Give Your Feedback</h1>;
  } else {
    return (
      <>
        <h1>statastics</h1>
        <table>
          <tbody>
            <tr>
              {/* These two StatasticsLine in the first tr is one component one is showing text good other is showing count We have seperated it to show them in two colomns */}
              <td>
                <StatasticsLine text="good" />
              </td>
              <td>
                <StatasticsLine value={props.good} />
              </td>
            </tr>

            <tr>
              <td>
                <StatasticsLine text="neutral" />
              </td>
              <td>
                <StatasticsLine value={props.neutral} />
              </td>
            </tr>
            <tr>
              <td>
                <StatasticsLine text="bad" />
              </td>
              <td>
                <StatasticsLine value={props.bad} />
              </td>
            </tr>

            <tr>
              <td>
                <StatasticsLine text="All" />
              </td>
              <td>
                <StatasticsLine
                  value={props.bad + props.neutral + props.good}
                />
              </td>
            </tr>

            <tr>
              <td>
                <StatasticsLine text="Average" />
              </td>
              <td>
                <StatasticsLine
                  value={
                    (((props.good - props.bad) /
                      (props.good + props.bad + props.neutral)) *
                      100) /
                    (props.good + props.bad + props.neutral)
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <StatasticsLine text="Positive" />
              </td>
              <td>
                <StatasticsLine
                  value={
                    (props.good / (props.good + props.neutral + props.bad)) *
                    100
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* <StatasticsLine text="good" value={props.good} />
        <StatasticsLine text="neutral" value={props.neutral} />
        <StatasticsLine text="bad" value={props.bad} />

        <StatasticsLine
          text="All"
          value={props.bad + props.neutral + props.good}
        />

        <StatasticsLine
          text="Average"
          value={
            (((props.good - props.bad) /
              (props.good + props.bad + props.neutral)) *
              100) /
            (props.good + props.bad + props.neutral)
          }
        />

        <StatasticsLine
          text="Positive"
          value={(props.good / (props.good + props.neutral + props.bad)) * 100}
        /> */}
      </>
    );
  }
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const calculateGood = () => {
    setGood(good + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={calculateGood} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />

      <Statastics good={good} bad={bad} neutral={neutral} />
    </div>
  );
}

export default App;
