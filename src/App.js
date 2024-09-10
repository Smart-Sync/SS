import './App.css';
import { Admin } from './components/Admin';
import { Navbar } from './components/Navbar';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { NewBoard } from './components/NewBoard';
import { Experts } from './components/Experts';
import { HomPage } from './pages/HomPage';
import { ExpertsProfile } from './components/ExpertsProfile';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HomPage></HomPage>
    ),
  },
  {
    path: "/newboard",
    element: <Navbar><NewBoard></NewBoard></Navbar>,
  },
  {
    path: "/experts",
    element:<Navbar> <Experts/></Navbar>,
  },
  {
    path: "/experts-profile",
    element:<Navbar> <ExpertsProfile/></Navbar>,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
