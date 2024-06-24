import axios from "../helpers/axios";
import { useState,useContext, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SignInForm() {
    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let [errors,setErrors] = useState(null);
    let [loading,setLoading] = useState(false);
    let loaction = useLocation();

    useEffect(() => {
        if(loaction.state) {
            toast(loaction.state.message, {autoClose: 2000, position: 'top-right'});
        }
    },[loaction.state]);

    let {dispatch} = useContext(AuthContext);
    let navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const user = { email, password };
            const res = await axios.post('/api/users/login', user);

            if (res.status === 200) {
                navigate('/', { state: { message: res.data.message } });
            }

            dispatch({ type: 'LOGIN', payload: res.data.user });
        } catch (error) {
            setErrors(error.response.data.errors || { password: { msg: error.response.data.error } });
        } finally {
            setEmail('');
            setPassword('');
            setLoading(false);

            setTimeout(() => {
                setErrors(null);
            }, 2000);
        }
    };

    
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
            <ToastContainer/>
        </div>
    )
}

export default SignInForm;