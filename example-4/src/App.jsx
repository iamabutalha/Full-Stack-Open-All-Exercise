import { useState } from "react";
import Notes from "./components/Notes.jsx";
import "./App.css";

function App({ notes }) {
  const result = notes.map((note) => {
    return note.content;
  });
  console.log(result);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note, i) => (
          <Notes notes={note} key={note.id} />
        ))}
      </ul>
    </div>
  );
}

export default App;
