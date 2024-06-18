import { useContext, useState } from "react";
import ProfileLayout from "../layout/ProfileLayout";
import { AuthContext } from "../contexts/authContext";
import axios from '../helpers/axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailAndName = () => {
    const { user, dispatch } = useContext(AuthContext);
    let [name,setName ] = useState(user?.name ?? '');
    let [email,setEmail ] = useState(user?.email ?? '');
    let [loading,setLoading] = useState(false);
    let [errors,setErrors] = useState(null);
    
    let updateEmailAndName = async(e) => {
        try{
            e.preventDefault();
            setLoading(true);
            let res = await axios.patch('/api/users/emailAndName/update',{ email, name});
            if(res) {
                let userRes = await axios.get('/api/users/me');
                dispatch({type: 'LOGIN', payload: userRes.data});
                toast('Email & Name have successfully changed',{ autoClose: 2000, position: 'top-right'});
            }
            setLoading(false);
        }catch(e) {
            setErrors(e.response.data.errors);
            setLoading(false);
            setTimeout(() => {
                setErrors(null);
            }, 2000);
            console.log(e.response.data.errors)
        }
    }

    return (
        <>
            <ProfileLayout>
                <ToastContainer/>
                <form className="max-w-[700px] mx-auto space-y-3" onSubmit={updateEmailAndName}>
                    <input 
                        type="text"
                        value={name}
                        onInput={(e) => setName(e.target.value)}
                        placeholder="eg: mgmg" 
                        className="w-full p-2 border-none rounded-sm outline-orange-200"
                    />
                    {errors?.name && <p className="text-start text-red-500">{errors?.name.msg}</p>}
                    <input 
                        type="email"
                        value={email}
                        onInput={(e) => setEmail(e.target.value)}
                        placeholder="eg: mgmg@gmail.com" 
                        className="w-full p-2 border-none rounded-sm outline-orange-200"
                    />
                    {errors?.email && <p className="text-start text-red-500">{errors?.email.msg}</p>}
                    <button type="submit" className="w-auto px-3 py-1 bg-orange-500 rounded-lg text-white hover:bg-orange-600 duration-150 flex items-center justify-center gap-2">
                        {loading && <span className="loading"></span>}
                        <span>Update</span>
                    </button>
                </form>
            </ProfileLayout>
        </>
    )
}

export default EmailAndName;