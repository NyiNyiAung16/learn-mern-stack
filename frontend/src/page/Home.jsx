import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Pagination from "../components/Pagination";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";

function Home() {
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
      navigate(`/?page=${page - 1}`);
    } else {
      setRecipes((prev) => prev.filter((r) => r._id !== _id));
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <span className="loading mx-auto"></span>}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {filteredRecipes?.length > 0 &&
          filteredRecipes.map((r) => (
            <RecipeCard 
                r={r} 
                key={r._id} 
                onDelete={onDelete} 
            />
          ))}
      </div>
      {!!links && <Pagination page={page} links={links} />}
    </>
  );
}

export default Home;
