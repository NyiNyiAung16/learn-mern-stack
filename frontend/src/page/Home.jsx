import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Pagination from "../components/Pagination";
import RecipeCard from "../components/RecipeCard";

function Home() {
  let location = useLocation();
  let navigate = useNavigate();
  let searchQuery = new URLSearchParams(location.search);
  let page = parseInt(searchQuery.get("page")) || 1;

  let {
    data: recipes,
    error,
    loading,
    links,
    setData: setRecipes,
  } = useFetch(`/api/recipes?page=${page}`);

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
        {recipes?.length > 0 &&
          recipes.map((r) => (
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
