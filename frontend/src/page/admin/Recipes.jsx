import Table from "../../components/Table";
import { useEffect, useState } from "react";
import axios from "../../helpers/axios";
import DOMPurify from "dompurify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilteredBy from "../../components/FilteredBy";
function Recipes() {
  let [recipes, setRecipes] = useState(null);
  let [filteredRecipes, setFilteredRecipes] = useState(null);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    let fetch = async () => {
      try {
        setLoading(true);
        let res = await axios.get("/api/admin/recipes");
        setRecipes(res.data);
        setFilteredRecipes(res.data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    };
    fetch();
  }, []);

  let deleteRecipe = async (id) => {
    try {
      let res = await axios.delete(`/api/admin/recipes/${id}`);
      if (res.status === 200) {
        let deletedRecipe = res.data.recipe;
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe._id !== deletedRecipe._id)
        );
        toast(res.data.message, {
          autoClose: 2000,
          position: "top-right",
          type: "success",
        });
      }
    } catch (e) {
      toast(e.response.data.error, {
        autoClose: 2000,
        position: "top-right",
        type: "error",
      });
    }
  };

  const filteredByTitleAndCreator = (search) => {
    setFilteredRecipes(
      recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(search.toLowerCase()) ||
          recipe.user.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const sortBy = (filter, isAscending) => {
    const sortFactor = isAscending ? 1 : -1;
    const sortedRecipes = [...recipes].sort((a, b) => {
      if (filter === "title") {
        return a.title.localeCompare(b.name) * sortFactor;
      } else if (filter === "creator") {
        return a.user.name.localeCompare(b.name) * sortFactor;
      } else if (filter === "createdAt") {
        return (new Date(b.createdAt) - new Date(a.createdAt)) * sortFactor;
      } else {
        return 0;
      }
    });
    setFilteredRecipes(sortedRecipes);
  };

  return (
    <>
      <FilteredBy
        filteredBySearch={filteredByTitleAndCreator}
        sortBy={sortBy}
        sortedArrays={["title", "creator", "createdAt"]}
        placeholder={"Search by Title or Creator"}
      />
      {loading && <span className="loading mx-auto"></span>}
      {filteredRecipes?.length > 0 && (
        <Table>
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Image
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Title
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Description
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Ingredients
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                CreatedBy
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                CreatedAt
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900"
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {filteredRecipes?.length > 0 &&
              filteredRecipes.map((recipe) => (
                <tr className="hover:bg-gray-50" key={recipe._id}>
                  <td className="px-6 py-4">
                    <div className="relative h-20 w-20 flex items-center">
                      <img
                        className="rounded-md object-contain object-center"
                        src={`${import.meta.env.VITE_BACKEND_ACCESS_URL}/${
                          recipe.photo_url
                        }`}
                        alt={recipe.photo_url}
                      />
                    </div>
                  </td>
                  <th className="px-6 py-4 font-normal text-gray-900">
                    <div className="font-medium text-gray-700">
                      {recipe.title}
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <div className="text-gray-700">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(recipe.description),
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    {recipe.ingredients?.length > 0 &&
                      recipe.ingredients.map((ingredient, i) => (
                        <span
                          className="bg-orange-400 text-white text-center rounded-lg px-2 py-1 text-sm"
                          key={i}
                        >
                          {" "}
                          {ingredient}{" "}
                        </span>
                      ))}
                  </td>
                  <td className="px-6 py-4">
                    <p>{recipe.user.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p>{new Date(recipe.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <i
                      className="fa-solid fa-trash text-xl hover:text-red-500 duration-150 cursor-pointer"
                      onClick={() => deleteRecipe(recipe._id)}
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
      <ToastContainer />
    </>
  );
}

export default Recipes;
