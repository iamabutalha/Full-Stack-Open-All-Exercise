import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createNote, toggleImportanceOf } from "./reducers/noteReducer.js";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { configureStore } from "@reduxjs/toolkit";
import filterReducer, { filterChange } from "./reducers/filterReducer.js";
import noteReducer from "./reducers/noteReducer.js";
import noteService from "./services/notes.js";
import { setNotes } from "./reducers/noteReducer.js";
import store from "./store/store.jsx";

console.log("In main.jsx ", store.getState());

// we had put this in initial state
// store.dispatch({
//   type: "NEW_NOTE",
//   payload: {
//     content: "state changes are made with actions",
//     important: false,
//     id: 2,
//   },
// });

const root = createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

store.subscribe(() => console.log(store.getState()));

store.dispatch(filterChange("IMPORTANT"));
store.dispatch(
  createNote("combineReducers froms one reducer from many simple reducers")
);
