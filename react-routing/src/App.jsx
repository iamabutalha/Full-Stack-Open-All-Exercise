import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import NAvbar from "./components/NAvbar";
import ParamComponents from "./components/ParamComponents";
import Courses from "./components/Courses";
import MockTest from "./components/MockTest";
import Reports from "./components/Reports";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <NAvbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/about",
    element: (
      <div>
        <NAvbar />
        <About />
      </div>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <div>
        <NAvbar />
        <Dashboard />
      </div>
    ),
    children: [
      {
        path: "courses",
        element: (
          <div>
            <NAvbar />
            <Courses />
          </div>
        ),
      },
      {
        path: "mock-test",
        element: (
          <div>
            <NAvbar />
            <MockTest />
          </div>
        ),
      },
      {
        path: "reports",
        element: (
          <div>
            <NAvbar />
            <Reports />
          </div>
        ),
      },
    ],
  },
  {
    path: "/student/:id",
    element: (
      <div>
        <NAvbar />
        <ParamComponents />
      </div>
    ),
  },
  {
    path: "*",
    element: (
      <div>
        <NotFound />
      </div>
    ),
  },
]);

function App() {
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
