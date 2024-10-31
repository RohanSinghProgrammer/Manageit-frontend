import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "@/pages/marketing/LandingPage";
import Board from "@/pages/app/board";
import SignUp from "@/pages/auth/SignUp";
import Login from "@/pages/auth/Login";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Organizations from "@/pages/app/organizations";
import UserManagement from "@/pages/app/userManagement";
import Teams from "@/pages/app/teams";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="/organizations/:orgId/board/:boardId" element={<Board />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/organizations/:orgId" element={<Organizations />} />
        <Route
          path="/:orgId/user-management/:userId"
          element={<UserManagement />}
        />
        <Route path="/organizations/:orgId/teams" element={<Teams />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
