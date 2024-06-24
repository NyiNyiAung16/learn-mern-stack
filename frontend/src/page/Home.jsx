import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Banner from "../components/Banner";
import axios from "../helpers/axios";
import Contact from '../components/Contact'
import { useLocation } from "react-router-dom";

function Home() {
  let [error,setError] = useState(null);
  let [loading,setLoading] = useState(false);
  let [PopularRecipes,setPopularRecipes] = useState(null);
  let loaction = useLocation();
  
  useEffect(() => {
    let state = loaction.state || {};
    let fetch = async () => {
      try {
        setLoading(true);
        let response = await axios.get('/api/recipes/popular');
        setPopularRecipes(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetch();
    if(state?.message) {
      toast(state.message, {autoClose: 2000, position: 'top-right'});
    }
  },[loaction.state]);


  let showToast = (text,config) => {
    toast(text, config);
  }

  let onDelete = (_id) => {
    setPopularRecipes((prev) => prev.filter((r) => r._id !== _id));
  };

  return (
    <>
    <div className="mb-12">
      <Banner/>
    </div>
    <div>
      {error && <p>{error}</p>}
      {loading && <span className="loading mx-auto"></span>}
      <div className="px-5">
        <h1 className="text-2xl font-bold mb-3 underline text-gray-600">Popular Recipes</h1>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {PopularRecipes?.length > 0 &&
            PopularRecipes.map((r) => (
              <RecipeCard 
                  r={r} 
                  key={r._id}  
                  showToast={showToast}
                  onDelete={onDelete}
              />
            ))}
        </div>
      </div>
      <ToastContainer/>
    </div>
    <div>
      <Contact/>
    </div>
    </>
  );
}

export default Home;
