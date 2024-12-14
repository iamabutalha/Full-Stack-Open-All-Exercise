import React from "react";

function Filter({ onChange, value, text }) {
  return (
    <div>
      {text}
      <input value={value} onChange={onChange} />
    </div>
  );
}

export default Filter;
