import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Pagination from "../components/Pagination";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Recipes() {
  let location = useLocation();
  let navigate = useNavigate();
  let searchQuery = new URLSearchParams(location.search);
  let page = parseInt(searchQuery.get("page")) || 1;
  const filter = useOutletContext();
  
  let {
    data: recipes,
    error,
    loading,
    links,
    setData: setRecipes,
  } = useFetch(`/api/recipes?page=${page}`);
  
  let [filteredRecipes,setFilteredRecipes] = useState(null);

  useEffect(() => {
    setFilteredRecipes(recipes);
    if (filter) {
      setFilteredRecipes(
        recipes.filter(
          (recipe) =>
            recipe.title.toLowerCase().includes(filter.toLowerCase()) ||
            recipe.user.name.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
  }, [filter,setRecipes,recipes]);

  let onDelete = (_id) => {
    if (recipes.length === 1 && page > 1) {
      navigate(`/recipes?page=${page - 1}`);
    } else {
      setRecipes((prev) => prev.filter((r) => r._id !== _id));
    }
  };

  let showToast = (text,config) => {
    toast(text, config);
  }

  return (
    <div className="mt-7">
      {error && <p>{error}</p>}
      {loading && <span className="loading mx-auto"></span>}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {filteredRecipes?.length > 0 &&
          filteredRecipes.map((r) => (
            <RecipeCard 
                r={r} 
                key={r._id} 
                onDelete={onDelete} 
                showToast={showToast}
            />
          ))}
          {filteredRecipes?.length <= 0 && <p className="text-lg font-semibold">No recipes found</p>}
      </div>
      {!!links && <Pagination page={page} links={links} />}
      <ToastContainer/>
    </div>
  );
}

export default Recipes;
