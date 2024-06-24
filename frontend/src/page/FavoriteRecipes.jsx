import { useContext, useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "../helpers/axios";
import { AuthContext } from "../contexts/authContext";

const FavoriteRecipes = () => {
    let { user } = useContext(AuthContext);
    let [favRecipes,setFavRecipes] = useState(null);
    let [loading,setLoading ] = useState(false);
    let [error,setError ] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try{
                setLoading(true);
                if(user?._id) {
                    let res =  await axios.get(`/api/users/${user._id}/favorites`);
                    setFavRecipes(res.data);
                    setLoading(false);
                }
            }catch(e) {
                setLoading(false);
                setError(e);
            }
        };
        fetch();
    },[user]);

    return (
        <>
            {error && <span className="text-md text-red-400 text-center">{error}</span>}
            {loading && <span className="loading mx-auto"></span>}
            <div className="grid grid-cols-3 gap-2">
                { favRecipes?.length > 0 && favRecipes.map((recipe) => (
                    <RecipeCard r={recipe} key={recipe._id}/>
                ))}
                {favRecipes?.length <= 0 && <p className="px-4">You do not have any favorite recipes!</p>}
            </div>
        </>
    )
}

export default FavoriteRecipes;