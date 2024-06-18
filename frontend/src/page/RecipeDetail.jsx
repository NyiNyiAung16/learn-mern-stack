import { useEffect, useState } from "react";
import axios from "../helpers/axios";
import { Link, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import CommentForm from "../components/CommentForm";
import DOMPurify from "dompurify";

function RecipeDetail() {
  let [recipe, setRecipe] = useState(null);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  let { id } = useParams();
  let [isFetch,setIsFetch] = useState(false);

  let cleanHTML = DOMPurify.sanitize(recipe?.description);

  useEffect(() => {
    let fetch = async () => {
      try {
        setLoading(true);
        let res = await axios.get(`/api/recipes/${id}`);
        setLoading(false);
        setRecipe(res.data);
      } catch (e) {
        setLoading(false);
        setError(e.message);
      }
    };
    fetch();
  }, [id]);

  let deleteRecipe = async () => {
    try {
      await axios.delete(`/api/recipes/${recipe._id}`);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      {loading && <span className="loading mx-auto"></span>}
      {error && <p>{error}</p>}
      {!!recipe && (
        <>
          <div className="max-w-[1200px] mx-auto bg-white rounded flex gap-10">
            <div>
              <img
                src={`${import.meta.env.VITE_BACKEND_ACCESS_URL}/${
                  recipe.photo_url
                }`}
                alt="photo"
                className="h-64 mx-auto object-contain rounded"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between mt-3">
                <Link to={`/recipes`}>
                  <h3 className="text-2xl font-bold text-orange-500">
                    {recipe.title}
                  </h3>
                </Link>
              </div>
              <div className="mt-1">
                <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
              </div>
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
              <p className="text-[#666]">
                Published at - {new Date(recipe.createdAt).toLocaleString()}
              </p>
              <div className="space-x-2 pb-3">
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
            <Comments isFetch={isFetch} recipe_id={recipe._id}/>
          </div>
        </>
      )}
    </>
  );
}

export default RecipeDetail;
