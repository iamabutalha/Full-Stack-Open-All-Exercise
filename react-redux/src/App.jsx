import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { incNumber, decNumber, reset } from "./actions/index.js";

function App() {
  const myState = useSelector((state) => state.chnageTheNumber);
  const dispatch = useDispatch();
  return (
    <>
      <h1>Welcome to redux</h1>
      <h4>using React and Redux</h4>
      <div className="quantity">
        <a
          className="quantity_minus"
          title="Decrement"
          onClick={() => dispatch(decNumber(4))}
        >
          <span>-</span>
        </a>
        <input
          type="text"
          name="quantity"
          className="quantity_input"
          value={myState}
        />
        <a
          className="quantity_minus"
          title="Decrement"
          onClick={() => dispatch(incNumber(7))}
        >
          <span>+</span>
        </a>
      </div>
      <button onClick={() => dispatch(reset())}>reset</button>
    </>
  );
}

export default App;
