import { useDispatch, useSelector } from "react-redux";
import {
  logOutUser,
  toggleShowProfile,
  userSelector,
} from "../redux/reducers/userReducer";

function UserProfile() {
  const dispatch = useDispatch();
  const { initialUser, showUserProfile } = useSelector(userSelector);

  return (
    <div className="absolute flex flex-col items-center justify-center p-3 m-5 transition duration-1000 ease-in-out rounded-md profile-info bg-slate-100 -top-4 -right-4">
      <span
        className="absolute text-lg font-bold cursor-pointer top-3 right-3"
        onClick={() => dispatch(toggleShowProfile())}
      >
        X
      </span>
      <span className="text-2xl text-center">{showUserProfile.name}</span>
      <div className="w-1/2 p-2 h-1/2">
        <img
          src={
            showUserProfile.profileImage ||
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt={showUserProfile.name}
          className="m-1 rounded-full"
        />
      </div>
      <span>Email: {showUserProfile.email}</span>

      {initialUser._id === showUserProfile._id ? (
        <button
          onClick={() => dispatch(logOutUser())}
          className="bg-[#3498db] rounded-md p-4 text-white text-lg m-3"
        >
          Log Out
        </button>
      ) : null}
    </div>
  );
}

export default UserProfile;
