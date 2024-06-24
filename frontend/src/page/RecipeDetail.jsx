import { useContext, useEffect, useState } from "react";
import axios from "../helpers/axios";
import { Link, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import CommentForm from "../components/CommentForm";
import DOMPurify from "dompurify";
import { AuthContext } from "../contexts/authContext";
import { addFavoriteHandler, removeFavoriteHandler } from "../helpers/favoriteHandler";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RecipeDetail() {
  let [recipe, setRecipe] = useState(null);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  let { id } = useParams();
  let [isFetch,setIsFetch] = useState(false);
  let { user, dispatch } = useContext(AuthContext);
  let [isFavorite, setIsFavorite] = useState(false);
  let cleanHTML = DOMPurify.sanitize(recipe?.description);

  const config = {
    autoClose: 2000,
    type: "success",
  };

  let showToast = (text,config) => {
    toast(text, config);
  }


  useEffect(() => {
    let fetch = async () => {
      try {
        setLoading(true);
        let res = await axios.get(`/api/recipes/${id}`);
        setLoading(false);
        setRecipe(res.data);
        setIsFavorite(user?.fav_recipes?.includes(res.data._id));
      } catch (e) {
        setLoading(false);
        setError(e.message);
      }
    };
    fetch();
  }, [id,user]);

  let deleteRecipe = async () => {
    try {
      await axios.delete(`/api/recipes/${recipe._id}`);
    } catch (e) {
      setError(e.message);
    }
  };

  const addFavorite = async (recipeId) => {
    await addFavoriteHandler(recipeId, user, dispatch, showToast, config);
  };

  let removeFavorite = async (recipeId) => {
    await removeFavoriteHandler(recipeId, user, dispatch, showToast, config);
  };

  return (
    <div>
      {loading && <span className="loading mx-auto"></span>}
      {error && <p>{error}</p>}
      {!!recipe && (
        <>
          <div className="max-w-[1000px] mx-auto bg-white rounded px-6 pb-4">
            <div>
              <img
                src={`${import.meta.env.VITE_BACKEND_ACCESS_URL}/${
                  recipe.photo_url
                }`}
                alt="photo"
                className="max-h-[300px] mx-auto object-contain rounded"
              />
            </div>  
            <div className="space-y-3 mt-5">
              <div className="flex justify-between">
                <h3 className="text-2xl font-bold text-orange-500">
                  {recipe.title}
                </h3>
                {user && <div className="space-x-3">
                  {!isFavorite && (
                    <i
                      className="fa-regular fa-heart text-lg cursor-pointer"
                      onClick={() => addFavorite(recipe._id)}
                    ></i>
                  )}
                  {isFavorite && (
                    <i
                      className="fa-solid fa-heart text-lg cursor-pointer text-red-500"
                      onClick={() => removeFavorite(recipe._id)}
                    ></i>
                  )}
                  <Link
                    to={`/recipes/edit/${recipe._id}`}
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
              <div className="mt-1">
                <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <span className="font-bold text-gray-600">Ingredients - </span>
                  {recipe.ingredients?.length > 0 &&
                    recipe.ingredients.map((ingredient, i) => (
                      <span
                        className="bg-orange-400 text-white text-center rounded-full px-2 py-1 text-sm me-2"
                        key={i}
                      >
                        {" "}
                        {ingredient}{" "}
                      </span>
                    ))}
                </div>
                <div>
                  <p className="text-[#666]">
                    Created By - {recipe.user.name}
                  </p>
                  <p className="text-[#666]">
                    Published at - {new Date(recipe.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link
              to="/"
              className="px-3 py-2 rounded bg-[#c7c7c7] text-[#303030] hover:bg-[#b8b8b8] duration-200 hover:underline"
            >
              Back To Home
            </Link>
          </div>
          <div className=" max-w-[800px] mx-auto rounded px-3 py-2 mt-5">
            <CommentForm setIsFetch={setIsFetch} recipe_id={recipe._id}/>
            {user && <Comments isFetch={isFetch} recipe_id={recipe._id}/>}
          </div>
        </>
      )}
      <ToastContainer/>
    </div>
  );
}

export default RecipeDetail;
