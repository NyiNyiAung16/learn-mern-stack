import axios from "../helpers/axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getPhotoURL from "../helpers/getPhotoURL";
import getPreviewURL from "../helpers/getPreviewURL";

function SignUpForm() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errors, setErrors] = useState(null);
  let [loading, setLoading] = useState(false);
  let [file,setFile] = useState(null);
  let [preview,setPreview] = useState('');

  let navigate = useNavigate();

  let register = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      let photo_url;
      if(file) {
        photo_url = await getPhotoURL(file,setErrors);
      }else {
        photo_url = 'default.jpg'
      }
      let user = {
        name,
        email,
        password,
        photo_url
      };

      let res = await axios.post("/api/users/register", user);
      if (res.status == 200) {
        setLoading(false);
        navigate('/');
      }
    } catch (e) {
      setLoading(false);
      setErrors(e.response.data.errors);
      setTimeout(() => {
        setErrors(null);
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={register}
      >
        <h3 className="text-2xl text-center font-bold text-orange-600 mb-2">
          Create a account?
        </h3>
        <div className="mb-4">
          {preview && <img className="h-[120px] w-auto mx-auto rounded-lg object-contain" src={preview} alt="preview" />}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={name}
            onInput={(e) => setName(e.target.value)}
          />
          {errors?.name && (
            <p className="text-red-500 text-xs mt-1">{errors?.name.msg}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onInput={(e) => setEmail(e.target.value)}
          />
          {errors?.email && (
            <p className="text-red-500 text-xs mt-1">{errors?.email.msg}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onInput={(e) => setPassword(e.target.value)}
          />
          {errors?.password && (
            <p className="text-red-500 text-xs">{errors?.password.msg}</p>
          )}
          <input type="file" accept="image/*" className="mt-1" onChange={ (e) => getPreviewURL(e,setFile,setPreview) }/> 
          {errors?.photo_url && (
            <p className="text-red-500 text-xs">{errors?.photo_url.msg}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {!loading && <span>Sign Up</span>}
            {loading && <span className="loading mx-auto"></span>}
          </button>
          <Link
            to={"/sign-in"}
            className="inline-block align-baseline font-bold text-sm text-orange-500 hover:text-orange-800"
          >
            Login Here?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
