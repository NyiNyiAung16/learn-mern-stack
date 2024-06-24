import axios from "../helpers/axios";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { addFavoriteHandler, removeFavoriteHandler } from "../helpers/favoriteHandler";

function RecipeCard({ r, onDelete, showToast }) {
  let { user, dispatch } = useContext(AuthContext);
  let [isFavorite, setIsFavorite] = useState(false);

  const config = {
    autoClose: 2000,
    type: "success",
  };

  useEffect(() => {
    setIsFavorite(user?.fav_recipes?.includes(r._id));
  }, [user, r]);

  let deleteRecipe = async () => {
    let res = await axios.delete(`/api/recipes/${r._id}`);
    if (res.status === 200) {
      if (onDelete) {
        onDelete(r._id);
      }
    }
  };

  const addFavorite = async (recipeId) => {
    await addFavoriteHandler(recipeId, user, dispatch, showToast, config);
  };

  let removeFavorite = async (recipeId) => {
    await removeFavoriteHandler(recipeId, user, dispatch, showToast, config);
  };

  return (
    <div className=" bg-white px-3 pb-3 rounded">
      <img
        src={`${import.meta.env.VITE_BACKEND_ACCESS_URL}/${r.photo_url}`}
        alt="photo"
        className="h-64 mx-auto object-contain"
      />
      <div className="flex items-center justify-between mt-3">
        <Link to={`/recipes/${r._id}`}>
          <h3 className="text-xl font-bold text-orange-500 hover:underline">
            {r.title}
          </h3>
        </Link>
        {user && <div className="space-x-3">
          {!isFavorite && (
            <i
              className="fa-regular fa-heart text-lg cursor-pointer"
              onClick={() => addFavorite(r._id)}
            ></i>
          )}
          {isFavorite && (
            <i
              className="fa-solid fa-heart text-lg cursor-pointer text-red-500"
              onClick={() => removeFavorite(r._id)}
            ></i>
          )}
          <Link
            to={`/recipes/edit/${r._id}`}
            className="text-sm text-white bg-yellow-500 py-1 px-2 rounded-md"
          >
            Edit
          </Link>
          <button
            className="text-sm text-white bg-red-500 py-1 px-2 rounded-md"
            onClick={deleteRecipe}
          >
            Delete
          </button>
        </div>}
      </div>
      <div className="mt-2">
      </div>
      <p className="text-end">
        <span className="font-bold">Creator By</span> <span>{r.user.name}</span>
      </p>
    </div>
  );
}

export default RecipeCard;
