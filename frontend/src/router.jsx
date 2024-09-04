import { createBrowserRouter, Navigate } from "react-router-dom";
import ForgottenPassword from "./pages/ForgottenPassword";
import ResetPassword from "./pages/resetPassword";
import VerifyUser from "./pages/verifyUser";
import ProfileImageUpload from "./components/ProfileImageUpload";
import UserProfile from "./components/userProfile";
import { useSelector } from "react-redux";
import { userSelector } from "./redux/reducers/userReducer";
import HomePage from "./pages/Home";
import GoogleCallback from "./pages/googleCallback";
import ChatPage from "./pages/chatPage";

export const ProtectedRouteChat = ({ element }) => {
  const { initialUser } = useSelector(userSelector);
  return initialUser.token ? element : <Navigate to="/" />;
};

export const ProtectedRoute = ({ element }) => {
  const { initialUser } = useSelector(userSelector);
  return initialUser.token ? <Navigate to="/users/chat" /> : element;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<HomePage />} />,
  },
  {
    path: "/users/auth/googleCallback",
    element: <GoogleCallback />,
  },
  {
    path: "/users/verify-user/:token",
    element: <VerifyUser />,
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
  { path: "/users/chat",
  element: <ProtectedRouteChat element={<ChatPage />} />,
  }
]);
