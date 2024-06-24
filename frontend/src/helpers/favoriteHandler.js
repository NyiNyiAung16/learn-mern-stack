import axios from './axios'
const addFavoriteHandler = async (recipeId,user,dispatch,showToast,config) => {
  try {
    const response = await axios.post(
      `/api/users/${user._id}/favorites/${recipeId}`
    );
    if (response.data) {
      const updatedUser = await axios.get("/api/users/me");
      dispatch({ type: "LOGIN", payload: updatedUser.data });
      showToast(response.data, config);
    }
  } catch (error) {
    showToast(error.message, { autoClose: 3000, type: "error" });
  }
};

let removeFavoriteHandler = async (recipeId,user,dispatch,showToast,config) => {
  try {
    let res = await axios.delete(
      `/api/users/${user._id}/favorites/${recipeId}`
    );
    if (res) {
      let userRes = await axios.get("/api/users/me");
      dispatch({ type: "LOGIN", payload: userRes.data });
      showToast(res.data, config);
    }
  } catch (e) {
    showToast(e.message, { autoClose: 3000, type: "error" });
  }
};


export { addFavoriteHandler, removeFavoriteHandler };