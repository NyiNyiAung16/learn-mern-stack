import { useContext, useState } from "react";
import ProfileLayout from "../layout/ProfileLayout";
import { AuthContext } from "../contexts/authContext";
import getPreviewURL from "../helpers/getPreviewURL";
import getPhotoURL from "../helpers/getPhotoURL";
import axios from "../helpers/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ProfilePicture = () => {
  let { user, dispatch } = useContext(AuthContext);
  let [showBtn, setShowBtn] = useState(false);
  let [loading, setLoading] = useState(false);
  let [label, setLabel] = useState("Choose a photo");
  let [file, setFile] = useState(null);
  let [errors, setErrors] = useState(null);
  let [preview, setPreview] = useState(
    `${import.meta.env.VITE_BACKEND_ACCESS_URL}/${user.photo_url}`
  );
  let navigate = useNavigate();

  let uploadPhoto = (e) => {
    setShowBtn(true);
    getPreviewURL(e, setFile, setPreview);
    setLabel(e.target.files[0].name);
  };

  const updatePhoto = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const photo_url = await getPhotoURL(file, setErrors);
      await axios.patch("/api/users/profilePicture/update", { photo_url });
      const userRes = await axios.get('/api/users/me');
      dispatch({ type: 'LOGIN', payload: userRes.data });
      toast("Profile Photo has successfully changed", {
        autoClose: 2000,
        position: "top-right",
      });
      navigate('/user-profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ProfileLayout>
        <ToastContainer />
        <img
          src={preview}
          alt="photo"
          className="h-32 mx-auto object-contain rounded-lg mb-2"
        />
        <form className="mt-2" onSubmit={updatePhoto}>
          <label
            htmlFor="picture"
            className="cursor-pointer block max-w-[200px] mx-auto px-3 py-2 rounded bg-gray-300"
          >
            {label}
          </label>
          <input
            type="file"
            id="picture"
            className="hidden"
            onChange={uploadPhoto}
          />
          {errors?.photo_url && (
            <p className="text-start text-red-500">{errors?.photo_url.msg}</p>
          )}
          {showBtn && (
            <button
              type="submit"
              className="w-auto mt-2 mx-auto px-3 py-1 bg-orange-500 rounded-lg text-white hover:bg-orange-600 duration-150 flex items-center justify-center gap-2"
            >
              {loading && <span className="loading"></span>}
              <span>Update</span>
            </button>
          )}
        </form>
      </ProfileLayout>
    </>
  );
};

export default ProfilePicture;
