import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

export const getNotes = () => axios.get(baseUrl).then((res) => res.data);

export const createNote = (newNote) =>
  axios.post(baseUrl, newNote).then((res) => res.data);

export const updateNote = (updateNote) =>
  axios.put(`${baseUrl}/${updateNote.id}`, updateNote).then((res) => res.data);
