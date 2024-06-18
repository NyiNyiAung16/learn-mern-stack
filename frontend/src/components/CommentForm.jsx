import { useContext, useState } from "react";
import axios from '../helpers/axios'
import { AuthContext } from '../contexts/authContext'

const CommentForm = ({setIsFetch, recipe_id}) => {
  let { user } = useContext(AuthContext);
    let [text,setText] = useState('');
    let [loading,setLoading] = useState(false);
    let [errors,setErrors] = useState(null);
    
    let submit = async(e) => {
      try{
        setLoading(true)
        e.preventDefault();
        let comment = {
          text,
          user: user._id,
          recipe_id
        }
       let res = await axios.post('/api/comments',comment);
       if(res) {
        setLoading(false);
        setIsFetch((prev) => !prev);
        setText('');
       }
      }catch(e) {
        setLoading(false);
        setErrors(e.response.data.errors);
        setTimeout(() => {
          setErrors(null);
        }, 2000);
      }
    }

  return (
    <form className="flex flex-col max-w-[600px] mx-auto" onSubmit={submit}>
      <label htmlFor="comments" className="font-medium mb-2">
        Advice or Suggestion , Comments here 👇
      </label>
      <textarea
        value={text}
        className="resize-none h-28 p-2 border-none focus:outline-orange-500"
        id="comments"
        placeholder="comments here..."
        onInput={(e) => setText(e.target.value)}
      ></textarea>
      {errors?.text && <p className="text-start text-red-500">{errors?.text.msg}</p>}
      <button
        type="submit"
        className="max-w-[80px] bg-orange-400 mt-2 px-3 py-2 rounded text-gray-100 hover:bg-orange-500 active:bg-orange-600 duration-150"
      >
        {!loading && <span>Submit</span>}
        {loading && <span className="loading mx-auto"></span>}
      </button>
    </form>
  );
};

export default CommentForm;
