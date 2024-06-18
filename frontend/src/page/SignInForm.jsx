import axios from "../helpers/axios";
import { useState,useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

function SignInForm() {
    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let [errors,setErrors] = useState(null);
    let [loading,setLoading] = useState(false);


    let {dispatch} = useContext(AuthContext);
    let navigate = useNavigate();

    let login  = async (e) => {
        setLoading(true);
        try{
            e.preventDefault();
            let user = {
                email,
                password
            };

            let res = await axios.post('/api/users/login',user);
            if(res.status === 200) {
                navigate('/');
            }
            dispatch({ type: 'LOGIN', payload: res.data.user})
            setLoading(false);
            setEmail('');
            setPassword('');
        }catch(e) {
            if(e.response.data.error){
                setErrors({password: {msg:e.response.data.error}});   
            }else{
                setErrors(e.response.data.errors);
            }
            setLoading(false);
            setTimeout(() => {
                setErrors(null);
            }, 2000);
        }

    }
    return (
        <div className="w-full max-w-md mx-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={login}>
            <h3 className="text-2xl text-center font-bold text-orange-600 mb-2">Login Here?</h3>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="email" 
                        type="email" 
                        placeholder="Email"
                        required
                        value={email}
                        onInput={(e) => setEmail(e.target.value)}
                    />
                    {errors?.email && <p className="text-red-500 text-xs mt-1">{errors?.email.msg}</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input 
                        className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        id="password" 
                        type="password" 
                        placeholder="******************"
                        value={password}
                        onInput={(e) => setPassword(e.target.value)}
                    />
                    {errors?.password && <p className="text-red-500 text-xs">{errors?.password.msg}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        {!loading && <span>Sign In</span>}
                        {loading && <span className="loading mx-auto"></span>}
                    </button>
                    <Link className="inline-block align-baseline font-bold text-sm text-orange-500 hover:text-orange-800" to="/sign-up">
                        Register Here?
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;