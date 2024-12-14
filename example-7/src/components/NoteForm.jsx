import React, { useState } from "react";

function NoteForm({ createNote }) {
  const [newNote, setNewNote] = useState("");
  const [secondInput, setSecondInput] = useState("");

  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      important: true,
    });
    setNewNote("");
  };
  return (
    <div className="formDiv">
      <h2>Create a new Note</h2>
      <form onSubmit={addNote}>
        <input
          type="text"
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
          placeholder="write note content here"
          id="note-input"
        />
        {/* <input
          value={secondInput}
          onChange={(e) => secondInput(e.target.value)}
        /> */}
        <button type="submit">save</button>
      </form>
    </div>
  );
}

export default NoteForm;
