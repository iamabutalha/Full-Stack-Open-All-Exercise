import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";
import { useState } from "react";

const Error = ({ message }) => {
  if (!message) {
    return null;
  }
  return <div style={{ color: "red" }}>{message}</div>;
};

const Authors = ({ SetError }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  // all Authors is a array of author in APi
  const authors = useQuery(ALL_AUTHORS).data.allAuthors;
  const [updateAuthor, result] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const updateAuthorHandler = () => {
    let matchingAuthor = authors.find((author) => author.name === name);
    console.log("Clicked");
    if (!matchingAuthor) {
      console.log("Name not avilable");
      setErrorMessage(`${name} is not an author`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
      return;
    }
    updateAuthor({ variables: { name, born: parseInt(born, 10) } });
    setBorn("");
  };
  return (
    <div>
      <Error message={errorMessage} />
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set BirthYear</h2>
        name{" "}
        <select name="authors" onChange={(e) => setName(e.target.value)}>
          {authors.map((author) => (
            <option value={author.name} key={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <br />
        <br />
        born{" "}
        <input
          type="number"
          value={born}
          onChange={(e) => setBorn(e.target.value)}
        />
        <br />
        <br />
        <button onClick={updateAuthorHandler}>update author</button>
      </div>
    </div>
  );
};

export default Authors;
