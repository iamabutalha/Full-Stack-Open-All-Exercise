import { createSlice } from "@reduxjs/toolkit";
import noteServices from "../services/notes.js";
import { useDispatch } from "react-redux";

const initialState = [
  {
    content: "the app state is in redux store",
    important: true,
    id: 1,
  },
  {
    content: "state changes are made with actions",
    important: false,
    id: 2,
  },
];

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    // createNote(state, action) {
    //   state.push(action.payload);
    // },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);
      const changeNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changeNote));
    },
    appendNote(state, action) {
      state.push(action.payload);
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});

/*
export const noteReducer = (state = initialState, action) => {
  console.log("Action of note reducer", action);

  switch (action.type) {
    case "NEW_NOTE":
      return [...state, action.payload];
    case "TOGGLE_IMPORTANCE": {
      const id = action.payload.id;
      const noteToChange = state.find((n) => n.id === id);
      const changeNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changeNote));
    }
    default:
      return state;
  }
};
*/

const generateId = () => {
  return Number(Math.random() * 1000000).toFixed(0);
};

/*
export const createNote = (content) => {
  return {
    type: "NEW_NOTE",
    payload: {
      content,
      important: false,
      id: generateId(),
    },
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    payload: { id },
  };
};
*/

export const { toggleImportanceOf, setNotes, appendNote } = noteSlice.actions;

export const initalizeNotes = () => {
  return async (dispatch) => {
    const notes = await noteServices.getAll();
    dispatch(setNotes(notes));
  };
};

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteServices.createNew(content);
    dispatch(appendNote(newNote));
  };
};

export default noteSlice.reducer;
