import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProfileImage, userSelector } from "../redux/reducers/userReducer";

const ProfileImageUpload = () => {
  const dispatch = useDispatch();
  const { initialUser } = useSelector(userSelector);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(
    initialUser.profileImage || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  ); // Initial dummy image URL

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setImageUrl(URL.createObjectURL(file)); // Show the selected image immediately
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);
    formData.append("userId", initialUser._id);

    try {
      const response = await axios.post(
        "/api/v1/chats/upload-profile-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(setProfileImage({ profileImage: response.data.profileImage }));
    } catch (error) {
      console.error("Error uploading the profile image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative overflow-hidden rounded-full cursor-pointer w-36 h-36"
        onClick={() => document.getElementById("fileInput").click()}
      >
        <img
          src={imageUrl}
          alt="Profile"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 hover:opacity-100">
          <div className="text-lg font-bold text-white">
            Change Profile Picture
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          className="px-4 py-2 mt-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default ProfileImageUpload;
