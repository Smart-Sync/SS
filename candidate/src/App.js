import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {UserProvider} from './UserContext';
import { Login } from './pages/Login';
import Profile from './pages/Profile'
import { Dashboard } from './pages/Dashboard';
import HomePage from './pages/RACDashboard';
import OpenVacancies from './components/OpenVacancies';
import ApplicationForm from './components/ApplicationForm';
import ApplicationStatus from './components/ApplicationStatus';
import { JobApply } from './pages/JobApply';
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
      <OpenVacancies />
    ),
  },
  {
    path: '/apply/:jodId',
    element: (
      <JobApply />
    ),
  },
  {
    path: '/apply/:jodId',
    element: (
      <JobApply />
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
      <ApplicationStatus></ApplicationStatus>
    ),
  },


]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
