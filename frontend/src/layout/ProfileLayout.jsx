import { NavLink } from "react-router-dom";

const ProfileLayout = ({ children }) => {

  return (
    <div className="grid grid-cols-4 bg-[#edecec] px-3 rounded">
      <div className="py-2 col-span-1 border-e-2 border-gray-400">
        <ul className="text-center text-lg font-medium space-y-3">
          <li
            className="cursor-pointer"
          >
            <NavLink to="/user-profile">Profile</NavLink>
          </li>
          <li
            className="cursor-pointer"
          >
            <NavLink to="/user-profilePicture">Profile Picture</NavLink>
          </li>
          <li
            className="cursor-pointer"
          >
            <NavLink to="/user-email&name">Email & Name</NavLink>
          </li>
          <li
            className="cursor-pointer"
          >
            <NavLink to="/user-password">Password</NavLink>
          </li>
        </ul>
      </div>
      <div className="py-3 col-span-3 ps-2">{children}</div>
    </div>
  );
};

export default ProfileLayout;
