import axios from "axios";

// this app is getting the json from the backend project where we use cors if we want to run this app we first have to enable the backend server
const baseUrl = "/api/notes";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

async function getAll() {
  const request = axios.get(baseUrl);
  // const nonExisting = {
  //   id: 1000,
  //   content: "This is a note not saved on the server",
  //   important: true,
  // };
  return await request.then((response) => {
    return response.data;
  });
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  setToken,
};
