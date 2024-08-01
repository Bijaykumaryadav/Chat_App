import { createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/signUp";

export const router = createBrowserRouter([
  {
    path: "/users/signUp",
    element: <SignUp />, // Corrected component usage
  },
]);
