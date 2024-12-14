import { useState, useEffect, useRef } from "react";
import Note from "./components/Note.jsx";
import axios from "axios";
import NoteServices from "./services/notes.js";
import Notification from "./components/Notification.jsx";
import loginService from "./services/login.js";
import LoginFrom from "./components/LoginFrom.jsx";
import Togglable from "./components/Togglable .jsx";
import NoteForm from "./components/NoteForm.jsx";
import Footer from "./components/Footer.jsx";
import { createStore } from "redux";

const noteReducer = (state = [], action) => {
  if (action.type === "NEW_NOTE") {
    state.push(action.payload);
    return state;
  }
  return state;
};

const store = createStore(noteReducer);

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "the app state is in redux store",
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "state changes are made with actions",
    important: false,
    id: 2,
  },
});

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNotes, setNewNotes] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const NoteFormRef = useRef();

  // This is an array which will show all the notes if showAll in state is true or vice versa
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  console.log(notesToShow);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      NoteServices.setToken(user.token);
    }
  }, []);
  useEffect(() => {
    console.log("effect");
    NoteServices.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  console.log("render", notes.length, "notes");
  if (!notes) {
    return null;
  }

  const addNotes = (noteObject) => {
    NoteFormRef.current.toggleVisibility();
    NoteServices.create(noteObject).then((returnedNote) => {
      console.log("response from post", returnedNote);
      setNotes(notes.concat(returnedNote));
      setNewNotes("");
    });
  };

  const toggleImportance = (id) => {
    console.log("importance of " + id + " need to be toggled");

    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    NoteServices.update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        alert(
          `The content ${note.content} was already deleted from the server`
        );
        setErrorMessage("Some error happened...");
        setTimeout(() => setErrorMessage(null), 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleNoteChange = (event) => {
    console.log("Button clicked", event.target.value);
    setNewNotes(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      NoteServices.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("wrong credientials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 10000);
    }
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel={"login"}>
        <LoginFrom
          username={username}
          password={password}
          handlePasswordChange={(e) => setPassword(e.target.value)}
          handleUsernameChange={(e) => setUsername(e.target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    );
  };

  console.log("User", user);

  function handleLogOut() {
    setUser(null);
    window.localStorage.clear();
  }

  return (
    <div>
      {user === null ? "" : <button onClick={handleLogOut}>logOut</button>}

      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <Togglable buttonLabel="new note" ref={NoteFormRef}>
            {/* this addNote is just a prop this is used on behalf of createNote and have parameter in the NoteForm component */}
            <NoteForm createNote={addNotes} />
          </Togglable>
        </div>
      )}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>

      <Footer />
    </div>
  );
};

export default App;
