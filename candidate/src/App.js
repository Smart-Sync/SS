import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {Login} from './pages/Login';
import Profile from './pages/Profile'
import {Dashboard} from './pages/Dashboard';
import HomePage from './pages/RACDashboard';
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HomePage />
    ),
  },
  {
    path: "/login",
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
      <Profile/>
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
