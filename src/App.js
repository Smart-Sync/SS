import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { HomPage } from './admin_pages/HomPage';
import { ExpertHomPage } from './expert_pages/ExpertHomePage';
import { NewBoardPage } from './admin_pages/NewBoardPage';
import { ExpertPage } from './admin_pages/ExpertPage';
import { ExpertsProfilePage } from './admin_pages/ExpertsProfilePage';
import ExpertProfilePage from './expert_pages/ExpertProfilePage';
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>Hello</div>
    ),
  },
  {
    path: "/admin/homepage",
    element: (
      <HomPage></HomPage>
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
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
