import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "./queries";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";

const App = () => {
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>loading...</div>;
  }
  console.log(result.data);

  return (
    <div>
      <div>
        <button>
          {" "}
          <Link to={"/"}>authors</Link>
        </button>
        <button>
          {" "}
          <Link to={"/books"}>books</Link>
        </button>
        <button>
          <Link to={"/addbook"}>add Book</Link>
        </button>
      </div>

      <Routes>
        <Route path="" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/addbook" element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
