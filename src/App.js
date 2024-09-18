import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AdminHomPage } from './admin_pages/AdminHomPage';
import {ExpertHomePage} from './expert_pages/ExpertHomePage'
import { NewBoardPage } from './admin_pages/NewBoardPage';
import { ExpertPage } from './admin_pages/ExpertPage';
import { ExpertsProfilePage } from './admin_pages/ExpertsProfilePage';
import { LandingPage } from './access_pages/LandingPage';
import { LoginPage } from './access_pages/LoginPage';
import { SignUpPage } from './access_pages/SignUpPage';
import { LoginExpert } from './access_pages/LoginExpert';

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
      localStorage.getItem("authToken")?<AdminHomPage></AdminHomPage>:null
    ),
  },
  {
    path: "/admin/newboard",
    element: localStorage.getItem("authToken")?<NewBoardPage></NewBoardPage>:null,
  },
  {
    path: "/admin/schedule-boards/:id",
    element:  localStorage.getItem("authToken")?<ExpertPage/>:null,
  },
  {
    path: "/admin/experts-profile",
    element:  localStorage.getItem("authToken")?<ExpertsProfilePage/>:null,
  },
  {
    path: "/expert/homepage",
    element:localStorage.getItem("authToken")?<ExpertHomePage/>:null,
  },
  {
    path: "/expert/expert-profile",
    element: localStorage.getItem("authToken")?<ExpertsProfilePage/>:null,
  },
  { path: "/loginexpert",
    element:<LoginExpert/>

  },
  {
    path: "/login",
    element:<LoginPage/>
  },
  {
    path: "/createuser",
    element:<SignUpPage/>
  },
  
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
