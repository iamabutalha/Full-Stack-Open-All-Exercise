import React from "react";
import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer.js";

function VisibilityFilter(props) {
  const dispatch = useDispatch();
  return (
    <div>
      all
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("ALL"))}
      />
      Important
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("IMPORTANT"))}
      />
      nonImportant
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("NONIMPORTANT"))}
      />
    </div>
  );
}

export default VisibilityFilter;
