import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {Login} from './pages/Login';
import {Dashboard} from './pages/Dashboard';
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Login />
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Dashboard />
    ),
  },
  {
    path: '/view-jobs',
    element: (
      <Dashboard />
    ),
  },
  {
    path: '/profile-settings',
    element: (
      <Dashboard />
    ),
  },
  {
    path: '/application-history',
    element: (
      <Dashboard />
    ),
  },
 
  
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
