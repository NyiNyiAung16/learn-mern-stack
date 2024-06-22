import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

function AdminLayout({ children }) {
  let { user } = useContext(AuthContext);

  return (
    <div className="grid grid-cols-12 h-screen">
      <ul className="col-span-3 px-3 py-5 bg-gray-300 text-center text-xl space-y-4 font-medium">
        <li>
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to='/admin/recipes'>Recipes</NavLink>
        </li>
      </ul>
      <div className="col-span-9 px-3 py-2 bg-gray-400">
        <div className="flex justify-between items-center mb-6">
          <NavLink to="/">
            <i className="fa-solid fa-house text-xl cursor-pointer hover:text-orange-600 duration-100"></i>
          </NavLink>
          <div className="flex items-center gap-1">
            <h1 className="font-medium">{user?.name}</h1> /<p>{user?.email}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
