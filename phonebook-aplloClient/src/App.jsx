import { useState } from "react";
import ReactDOM from "react-dom/client";
import { gql, useQuery } from "@apollo/client";
import { ALL_PERSONS } from "./queries";
import "./App.css";
import Persons from "./components/Persons";
import PersonFrom from "./components/PersonFrom";
import PhoneForm from "./components/PhoneForm";

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(
    ALL_PERSONS
    //   , {
    // pollInterval: 2000,
    // }
  );
  if (result.loading) {
    return <h1>Hello</h1>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };
  // return <div>{result.data.allPersons.map((p) => p.name).join(", ")}</div>;
  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonFrom setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

export default App;
