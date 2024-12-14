import React from "react";
import { useDispatch } from "react-redux";
// import { deleteUsers } from "../store/slices/userSlice.jsx";
import { clearAll } from "../store/actions/index.jsx";
function DeleteAllUsers() {
  const dispatch = useDispatch();
  const removeAll = () => {
    dispatch(clearAll());
  };
  return <button onClick={() => removeAll()}>Delete All Users</button>;
}

export default DeleteAllUsers;
