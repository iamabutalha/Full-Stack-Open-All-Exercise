import { useState } from "react";
import Filter from "./components/Filter.jsx";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

const Message = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="submit">{message}</div>;
};

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="error">{message}</div>;
};

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filterContacts, setfilterContacts] = useState("");
  const [submitMessage, setsubmitMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    axios.get("/api/persons").then((response) => {
      console.log(response.data);
      setPersons(response.data);
    });
  }, []);

  const personsSubmitHandler = (e) => {
    e.preventDefault();

    if (!newName || newName.length < 3) {
      setErrorMessage("Length of name must be greater than 3", newName);
      setNewName("");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }
    const newObject = {
      name: newName,
      number: number || "",
    };

    // check if the name already exists then not add it
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newObject.name) {
        let result = window.confirm(
          `${newName} is added to the phone book do you want to replace old phone number?`
        );
        if (result === false) {
          return;
        } else if (result) {
          axios
            .put(`/api/persons/${persons[i].id}`, newObject)
            .then((response) => {
              // We have map so we could not disturb the array index or the sequence of the number
              // if we the person in the array id matches the contact person we are updating put the response data else put person in the array
              setPersons(
                persons.map((person) =>
                  person.id === persons[i].id ? response.data : person
                )
              );

              setsubmitMessage(`${newName} was added`);
              setTimeout(() => {
                setsubmitMessage(null);
              }, 5000);
              setErrorMessage(null);
            });
        }
        setNewName("");
        setNumber("");
        return;
      }
    }

    axios
      .post("/api/persons", newObject)
      .then((response) => {
        console.log(response.data);
        setPersons([...persons, response.data]);
        setsubmitMessage(`${newName} was added`);
        setTimeout(() => {
          setsubmitMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setErrorMessage(`${error.message}`);
      });

    setNewName("");
    setNumber("");
  };

  // Filtering logic
  let searchContacts = [...persons];

  // the filterContacts is the value of the input filed which will be typed by the user
  if (filterContacts) {
    searchContacts = searchContacts.filter((person) => {
      return (
        person.name.toLowerCase().includes(filterContacts.toLowerCase()) ||
        person.name.includes(filterContacts)
      );
    });
  }

  console.log(searchContacts);

  const chnageHandler = (e) => {
    setfilterContacts(e.target.value);
  };

  function handleDelete(id) {
    let result = window.confirm("Do you want to delete the contact");
    if (result === false) {
      return;
    }
    axios
      .delete(`/api/persons/${id}`)
      .then((response) => {
        console.log("Deleted post with id ", id);
        let people = persons.filter((person) => {
          return person.id !== id;
        });
        console.log("people array", people);

        setPersons(people);
        setsubmitMessage("Contact deleted successfully");
        setTimeout(() => {
          setsubmitMessage(null);
        }, 2000);
      })
      .catch((error) => {
        console.log("Delete error", error);

        setErrorMessage("error Contact was already deleted from the server");
        setsubmitMessage(null);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={submitMessage} />
      <ErrorMessage message={errorMessage} />
      <Filter
        text="filter contacts"
        value={filterContacts}
        onChange={chnageHandler}
      />

      <h2>add a new</h2>
      <form onSubmit={personsSubmitHandler}>
        <div>
          name :{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number
          <input
            value={number}
            type="number"
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>

      {searchContacts.length > 0 ? (
        searchContacts.map((person, i) => {
          return (
            <p key={person.id}>
              {person.name} {person.number}
              <button onClick={() => handleDelete(person.id)}>Delete</button>
            </p>
          );
        })
      ) : (
        <p>No contact found</p>
      )}
    </div>
  );
}

export default App;
