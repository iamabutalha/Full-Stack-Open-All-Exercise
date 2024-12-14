import { createSlice } from "@reduxjs/toolkit";
import { clearAll } from "../actions/index.jsx";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addUser(state, action) {
      state.push(action.payload);
    },
    removeUser(state, action) {
      let id = action.payload;
      state.splice(id, 1);
    },
    // deleteUsers(state, action) {
    //   return [];
    // },
  },
  extraReducers(builder) {
    builder.addCase(clearAll, () => {
      return [];
    });
  },
});
console.log(userSlice.actions);

export default userSlice;
export const { addUser, removeUser, deleteUsers } = userSlice.actions;
