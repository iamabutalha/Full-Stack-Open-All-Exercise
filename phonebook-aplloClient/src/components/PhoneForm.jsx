import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_NUMBER } from "../queries.js";

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [changeNumber, result] = useMutation(EDIT_NUMBER);
  const editNumberSubmit = (event) => {
    event.preventDefault();

    changeNumber({ variables: { name, phone } });
    setName("");
    setPhone("");
  };

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError("Person Not found");
      console.log("USer not found");
    }
  }, [result.data]);

  return (
    <div>
      <h2>Change Number</h2>
      <form onSubmit={editNumberSubmit}>
        <div>
          name:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          phone{" "}
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="submit">change Number</button>
      </form>
    </div>
  );
};

export default PhoneForm;
