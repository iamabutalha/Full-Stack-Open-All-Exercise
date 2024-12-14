import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./store/slices/userSlice.jsx";
const store = configureStore({
  reducer: {
    users: userSlice.reducer,
  },
});
export default store;
