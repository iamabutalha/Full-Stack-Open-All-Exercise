import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ALL_PERSONS, CREATE_PERSON, EDIT_NUMBER } from "../queries";

function PersonFrom({ setError }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    // When ever a new person is mutated/created refetch the ALL_PERSONS query mean add all person again with the new person
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      const message = error.graphQLErrors.map((e) => e.message).join("\n");
      setError(message);
    },
  });

  const submit = (event) => {
    event.preventDefault();

    createPerson({ variables: { name, phone, street, city } });
    setCity("");
    setName("");
    setStreet("");
    setPhone("");
  };

  return (
    <div>
      <h2>create new </h2>
      <form onSubmit={submit}>
        <div>
          name{" "}
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
        <div>
          street{" "}
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>

        <div>
          city{" "}
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <button type="submit">add!</button>
      </form>
    </div>
  );
}

export default PersonFrom;
