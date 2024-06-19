import axios from "../helpers/axios";
import { Link } from "react-router-dom";
import DOMPurify from 'dompurify';
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../contexts/authContext'

function RecipeCard({r, onDelete}) {
    let { user, dispatch } = useContext(AuthContext);

    let [isFavorite,setIsFavorite] = useState(false);
    let cleanHTML = DOMPurify.sanitize(r.description);

    const config =  { 
        autoClose: 2000,
        type: 'success'
    };

    useEffect(() => {
        setIsFavorite(user.fav_recipes.includes(r._id));
    },[user,r]);


    let deleteRecipe = async () => {
        let res = await axios.delete(`/api/recipes/${r._id}`);
        if(res.status === 200) {
            if(onDelete) {
                onDelete(r._id);
            }
        }
    }

    let addFavorite = async(recipeId) => {
        try{
            let res = await axios.post(`/api/users/${user._id}/favorites/${recipeId}`);
            if(res){
                let userRes = await axios.get('/api/users/me');
                dispatch({type: 'LOGIN', payload: userRes.data});
                toast(res.data,config);
            }
        }catch(e) {
            toast(e.message, { autoClose: 3000, type: 'error' })
        }
    }

    let removeFavorite = async(recipeId) => {
        try{
            let res = await axios.delete(`/api/users/${user._id}/favorites/${recipeId}`);
            if(res){
                let userRes = await axios.get('/api/users/me');
                dispatch({type: 'LOGIN', payload: userRes.data});
                toast(res.data, config);
            }
        }catch(e) {
            toast(e.message, { autoClose: 3000, type: 'error' })
        }
    }

    return (
        <div className=" bg-white px-3 pb-3 rounded">
            <img src={`${import.meta.env.VITE_BACKEND_ACCESS_URL}/${r.photo_url}`} alt="photo" className="h-64 mx-auto object-contain" />
            <div className="flex items-center justify-between mt-3">
                <Link to={`/recipes/${r._id}`}>
                    <h3 className="text-xl font-bold text-orange-500 hover:underline">{r.title}</h3>
                </Link>
                <div className="space-x-3">
                    {!isFavorite && <i className="fa-regular fa-heart text-lg cursor-pointer" onClick={() => addFavorite(r._id)}></i>}
                    {isFavorite && <i className="fa-solid fa-heart text-lg cursor-pointer text-red-500" onClick={() => removeFavorite(r._id)}></i>}
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
                </div>
            </div>
            <div className="mt-2">
                <div>
                    <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
                </div>
            </div>
            <p className="text-end"><span className="font-bold">Creator By</span> <span>{r.user.name}</span></p>
            <ToastContainer/>
        </div>
    )
}

export default RecipeCard;