import chnageTheNumber from "./upDown.js";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  chnageTheNumber: chnageTheNumber,
});

export default rootReducer;
