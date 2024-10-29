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
import ForgotPassword from "./pages/auth/ForgotPassword";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="/board/:id" element={<Board />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
