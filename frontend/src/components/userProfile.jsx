import { useDispatch, useSelector } from "react-redux";
import {
  logOutUser,
  toggleShowProfile,
  userSelector,
} from "../redux/reducers/userReducer";

function UserProfile() {
  const dispatch = useDispatch();
  const {initialUser,showUserProfile} = useSelector(userSelector);
  return <div></div>;
}

export default UserProfile;
