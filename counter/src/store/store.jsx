import noteReducer from "../reducers/noteReducer.js";
import filterReducer from "../reducers/filterReducer.js";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
});

export default store;
