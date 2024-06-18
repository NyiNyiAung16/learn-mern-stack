import { AuthContext } from "../contexts/authContext";
import axios from "../helpers/axios";
import { useContext, useEffect, useState } from "react";

const Comments = ({ isFetch, recipe_id }) => {
  let { user } = useContext(AuthContext);
  let [comments, setComments] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [errors,setErrors] = useState(null);
  let [isEdit, setIsEdit] = useState(false);
  let [tempText, setTempText] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        let res = await axios.get("/api/comments");
        if (res) {
          setComments(res.data);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    };
    fetch();
  }, [isFetch]);

  let updateComment = async (e, id) => {
    if (e.key == "Enter") {
      let comment = {
        text: tempText,
        user: user._id,
      };
      try {
        let res = await axios.patch(`/api/comments/${id}`, comment);
        if (res) {
          setComments((prev) =>
            prev.map((c) => {
              if (c._id === id) {
                return { ...c, text: tempText };
              }
              return c;
            })
          );
          setIsEdit("");
        }
      } catch (e) {
        setErrors(e.response.data.errors);
        setTimeout(() => {
          setErrors(null);
        }, 2000);
        console.log(e.response.data.errors);
      }
    }
  };

  let deleteComment = async (id) => {
    try {
      await axios.delete(`/api/comments/${id}`);
      setComments((prev) => prev.filter((c) => c._id !== id));
    } catch (e) {
      setError(e.response.data.errors.text.msg);
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <span className="loading mx-auto"></span>}
      {!!comments &&
        comments.map(
          (comment) =>
            comment.recipe_id == recipe_id && (
              <div
                key={comment._id}
                className="bg-gray-200 mb-3 px-3 py-2 rounded mt-4"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_ACCESS_URL}/${
                        comment.user.photo_url
                      }`}
                      alt="photo"
                      className="h-[50px] w-[50px] object-cover rounded-full mb-2"
                    />
                    <h4 className="font-medium capitalize">{comment.user.name}</h4>
                  </div>
                  {user._id == comment.user._id && (
                    <div>
                      <i
                        className="fa-solid fa-pen hover:text-orange-500 cursor-pointer"
                        onClick={() => {
                          setIsEdit(comment._id);
                          setTempText(comment.text);
                        }}
                      ></i>
                      <i
                        className="fa-solid fa-trash ms-3 hover:text-red-600 cursor-pointer"
                        onClick={() => deleteComment(comment._id)}
                      ></i>
                    </div>
                  )}
                </div>
                {isEdit != comment._id && (
                  <p className="mt-1">{comment.text}</p>
                )}
                {isEdit == comment._id && (
                  <input
                    value={tempText}
                    className="bg-gray-300 rounded p-2 w-full focus:outline-none"
                    autoFocus
                    onInput={(e) => setTempText(e.target.value)}
                    onKeyUp={(e) => updateComment(e, comment._id)}
                  />
                )}
                {(errors?.text && isEdit == comment._id)&& (
                  <p className="text-start text-red-500">{errors?.text.msg}</p>
                )}
              </div>
            )
        )}
    </>
  );
};

export default Comments;
