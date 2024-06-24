import axios from "../helpers/axios";
import { Link, NavLink, useNavigate, useLocation} from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useContext, useState } from "react";
import Filter from "./Filter";

function Navbar({setFiler}) {
  let navigate = useNavigate();
  let [showProfile, setShowProfile] = useState(false);
  let { user, dispatch } = useContext(AuthContext);
  const location = useLocation();

  let logout = async () => {
    await axios.post("/api/users/logout");
    dispatch({ type: "LOGOUT" });
    setShowProfile(false);
    navigate("/sign-in",{ state: { message: "Logged out successfully" } });
  };

  return (
    <div className="flex justify-between items-center p-5 bg-white select-none">
      <h3 className="text-orange-500 font-bold text-2xl">{import.meta.env.VITE_APP_NAME}</h3>
      <ul className="flex items-center gap-7">
        {location.pathname === '/recipes' && <li>
          <Filter setFiler={setFiler}/>
        </li>}
        <li>
          <NavLink to="/" className="hover:text-orange-500 font-medium">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="hover:text-orange-500 font-medium">
            About
          </NavLink>
        </li> 
        <li>
          <NavLink
            to="/recipes"
            className="hover:text-orange-500 font-medium"
          >
            Recipes
          </NavLink>
        </li>
       {user && <li>
          <NavLink
            to="/recipe/create"
            className="hover:text-orange-500 font-medium"
          >
            Create Recipe
          </NavLink>
        </li>}
        {user?.isAdmin && <li>
          <NavLink
            to="/admin/dashboard"
            className="hover:text-orange-500 font-medium"
          >
            Admin Dashboard
          </NavLink>
        </li>}
        {user && (
          <div className="relative z-10">
            <img
              src={`${
                import.meta.env.VITE_BACKEND_ACCESS_URL
              }/${user.photo_url}`}
              alt="photo"
              className="h-10 w-10 mx-auto object-cover rounded-full cursor-pointer"
              onClick={() => setShowProfile((prev) => !prev)}
            />
            {showProfile && (
              <ul className=" bg-gray-200 rounded space-y-1 absolute top-14 right-0">
                <li className="px-3 py-1 border-b-2 border-gray-300 hover:text-orange-400">
                  <Link to='/user-profile' onClick={() => setShowProfile(false)}>User Profile</Link>
                </li>
                <li className="px-3 py-1 border-b-2 border-gray-300 hover:text-orange-400">
                  <Link to='/user/favoriteRecipes' onClick={() => setShowProfile(false)}>Favorite Recipes</Link>
                </li>
                <li className="px-3 py-1">
                  <button
                    onClick={logout}
                    className="hover:text-orange-500 font-medium"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
