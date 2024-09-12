import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { HomPage } from './admin_pages/HomPage';
import { ExpertHomPage } from './expert_pages/ExpertHomePage';
import { NewBoardPage } from './admin_pages/NewBoardPage';
import { ExpertPage } from './admin_pages/ExpertPage';
import { ExpertProfilePage } from './admin_pages/ExpertProfilePage';
const router = createBrowserRouter([
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
    element: <ExpertProfilePage/>,
  },
  {
    path: "/expert/homepage",
    element:<ExpertHomPage></ExpertHomPage>
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
