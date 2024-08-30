import { createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import ForgottenPassword from "./pages/ForgottenPassword";
import ResetPassword from "./pages/resetPassword";

export const router = createBrowserRouter([
  {
    path: "/users/signUp",
    element: <SignUp />,
  },
  {
    path: "/users/signIn",
    element: <SignIn />,
  },
  { path: "/users/forgotten-password", 
    element: <ForgottenPassword /> 
  },
  {
    path: "/users/reset-password/:token",
    element: <ResetPassword />,
  }
]);
