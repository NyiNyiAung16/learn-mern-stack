import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import ProfileLayout from "../layout/ProfileLayout";

const UserProfile = () => {
  let { user } = useContext(AuthContext);

  return (
    <>
      <ProfileLayout>
        <div className="max-w-[400px] mx-auto text-center">
          <img
            src={`${
              import.meta.env.VITE_BACKEND_ACCESS_URL
            }/${user.photo_url}`}
            alt="photo"
            className="h-32 mx-auto object-contain rounded-lg mb-2"
          />
          <p className="text-lg font-medium">Name - {user?.name}</p>
          <h3 className="text-lg font-medium">Email - {user?.email}</h3>
        </div>
      </ProfileLayout>
    </>
  );
};

export default UserProfile;
