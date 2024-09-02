import { createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import ForgottenPassword from "./pages/ForgottenPassword";
import ResetPassword from "./pages/resetPassword";
import VerifyUser from "./pages/verifyUser";
import ProfileImageUpload from "./components/ProfileImageUpload";
import UserProfile from "./components/userProfile";

export const router = createBrowserRouter([
  {
    path: "/users/signUp",
    element: <SignUp />,
  },
  {
    path: "/users/verify-user/:token",
    element: <VerifyUser />,
  },
  {
    path: "/users/signIn",
    element: <SignIn />,
  },
  {
    path: "/users/forgotten-password",
    element: <ForgottenPassword />,
  },
  {
    path: "/users/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/users/profileImage_upload",
    element: <ProfileImageUpload />,
  },
  {
    path: "/users/profile",
    element: <UserProfile />,
  },
]);
