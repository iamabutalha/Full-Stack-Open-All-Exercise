import { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import NewNote from "./components/NewNote.jsx";
import Notes from "./components/Notes.jsx";
import VisibilityFilter from "./components/VisibilityFilter.jsx";
import { initalizeNotes } from "./reducers/noteReducer.js";

function App() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(initalizeNotes()), []);
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
}
export default App;
