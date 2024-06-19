import axios from "../helpers/axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyEditor from "../components/MyEditor";
import getPhotoURL from "../helpers/getPhotoURL";
import getPreviewURL from "../helpers/getPreviewURL";
import { AuthContext } from "../contexts/authContext";

function RecipeForm() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [ingredients, setIngredients] = useState([]);
  let [tempIngredient, setTempIngredient] = useState("");
  let [errors, setErrors] = useState({});
  let [file, setFile] = useState(null);
  let [preview, setPreview] = useState(null);
  let [loading, setLoading] = useState(false);

  let { user } = useContext(AuthContext);

  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    let fetchRecipe = async () => {
      if (id) {
        let res = await axios.get(`/api/recipes/${id}`);
        if (res.status === 200) {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setIngredients(res.data.ingredients);
          setPreview(
            import.meta.env.VITE_BACKEND_URL + "/" + res.data.photo_url
          );
          setFile(res.data.photo_url);
        }
      }
    };
    fetchRecipe();
  }, [id]);

  const submit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      let recipe = {
        title,
        description,
        ingredients,
        photo_url: null,
        user: user._id,
      };

      let res;
      if (id) {
        recipe.photo_url = file;
        res = await axios.patch(`/api/recipes/${id}`, recipe);
      } else {
        recipe.photo_url = await getPhotoURL(file, setErrors);
        if (recipe.photo_url) {
          res = await axios.post("/api/recipes", recipe);
        }
      }
      if (res.data) {
        setLoading(false);
        navigate("/");
      }
    } catch (e) {
      setLoading(false);
      setErrors(e.response.data.errors);
      setTimeout(() => {
        setErrors({});
      }, 2000);
    }
  };

  const addIngredients = () => {
    if (!tempIngredient) return;
    setIngredients((prev) => [tempIngredient, ...prev]);
    setTempIngredient("");
  };

  const upload = (e) => {
    getPreviewURL(e, setFile, setPreview);
  };

  const onChangeText = (data) => {
    setDescription(data);
  };

  return (
    <form
      className="max-w-xl mx-auto border-white border-2 rounded p-3 space-y-4"
      onSubmit={submit}
    >
      <h2 className="text-center text-2xl text-orange-500 font-bold">
        Recipe {id ? "Edit" : "Create"} Form
      </h2>
      <input
        type="text"
        value={title}
        onInput={(e) => setTitle(e.target.value)}
        placeholder="eg: How to make a cake?"
        className="w-full p-2 border-none rounded-sm outline-orange-200"
      />
      {errors?.title && (
        <p className="text-red-500 text-xs mt-1">{errors?.title.msg}</p>
      )}
      <MyEditor
        onChangeText={onChangeText}
        placeholder={description ? "" : "Start typings description..."}
        description={description}
      />
      {errors?.description && (
        <p className="text-red-500 text-xs mt-1">{errors?.description.msg}</p>
      )}
      <div className="flex items-center gap-5">
        <input
          type="text"
          value={tempIngredient}
          onInput={(e) => setTempIngredient(e.target.value)}
          placeholder="eg: soda water"
          className="w-full p-2 border-none rounded-sm outline-orange-200"
        />
        <i
          className="fa-solid fa-plus p-2 rounded-2xl bg-orange-400 text-white text-center cursor-pointer"
          onClick={addIngredients}
        ></i>
      </div>
      {errors?.ingredients && (
        <p className="text-red-500 text-xs mt-1">{errors?.ingredients.msg}</p>
      )}
      <p>
        Ingredients -
        {ingredients?.length > 0 &&
          ingredients.map((ing, i) => (
            <span
              className="ms-2 bg-orange-400 text-white text-center rounded-full px-2 py-1 text-sm me-2"
              key={i}
            >
              {ing}
            </span>
          ))}
      </p>
      <input type="file" accept="image/*" onChange={upload} />
      {errors?.photo_url && (
        <p className="text-red-500 text-xs mt-1">{errors?.photo_url.msg}</p>
      )}
      {preview && (
        <img
          className="h-[170px] w-auto rounded-lg object-contain"
          src={preview}
          alt="preview"
        />
      )}
      <button
        type="submit"
        className="w-full py-1  bg-orange-500 rounded-full text-white hover:bg-orange-600 duration-150 flex items-center justify-center gap-2"
      >
        {loading && <span className="loading"></span>}
        <span>{id ? "Update" : "Create"} Recipe</span>
      </button>
    </form>
  );
}

export default RecipeForm;
