import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AdminHomPage } from './admin_pages/AdminHomPage';
import { ExpertHomPage } from './expert_pages/ExpertHomePage';
import { NewBoardPage } from './admin_pages/NewBoardPage';
import { ExpertPage } from './admin_pages/ExpertPage';
import { ExpertsProfilePage } from './admin_pages/ExpertsProfilePage';
import ExpertProfilePage from './expert_pages/ExpertProfilePage';
import { ExpertDashboard } from './experts_components/ExpertDashboard';
import { LandingPage } from './access_pages/LandingPage';
import { LoginPage } from './access_pages/LoginPage';
import { SignUpPage } from './access_pages/SignUpPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
     <LandingPage></LandingPage>
    ),
  },
  {
    path: "/admin/homepage",
    element: (
      <AdminHomPage></AdminHomPage>
    ),
  },
  {
    path: "/admin/newboard",
    element: <NewBoardPage></NewBoardPage>,
  },
  {
    path: "/admin/schedule-boards",
    element: <ExpertPage/>,
  },
  {
    path: "/admin/experts-profile",
    element: <ExpertsProfilePage/>,
  },
  {
    path: "/expert/homepage",
    element:<ExpertHomPage></ExpertHomPage>
  },
  {
    path: "/expert/expert-profile",
    element:<ExpertProfilePage></ExpertProfilePage>
  },
  {
    path: "/login",
    element:<LoginPage/>
  },
  {
    path: "/signup",
    element:<SignUpPage/>
  },
  
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
