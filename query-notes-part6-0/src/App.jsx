import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getNotes, createNote, updateNote } from "./request.js";

const App = () => {
  const queryClient = useQueryClient();

  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      queryClient.getQueryData(["notes"], notes.concat(newNote));
    },
  });
  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    console.log(content);
    newNoteMutation.mutate({ content, important: true });
  };

  console.log(createNote);

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries("notes");
    },
  });

  const toggleImportance = (note) => {
    console.log("toggle importance of", note.id);
    updateNoteMutation.mutate({ ...note, important: !note.important });
  };

  const result = useQuery({
    queryKey: ["notes"],
    // queryFn: () =>
    //   axios.get("http://localhost:3001/notes").then((res) => res.data),
    queryFn: getNotes,
    refetchOnWindowFocus: false,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }
  if (result.isError) {
    return <div>Some Error Happened</div>;
  }

  const notes = result.data;

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? "important" : ""}</strong>
        </li>
      ))}
    </div>
  );
};

export default App;
