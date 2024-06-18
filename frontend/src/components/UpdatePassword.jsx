import { useState } from "react";
import ProfileLayout from "../layout/ProfileLayout";
import axios from '../helpers/axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdatePassword = () => {
    let [oldPassword, setOldPassword] = useState('');
    let [newPassword, setNewPassword] = useState('');
    let [loading,setLoading] = useState(false);
    let [errors,setErrors] = useState(null);

    let update = async(e) => {
        try{
            e.preventDefault();
            setLoading(true);
            let res = await axios.patch('/api/users/password/update', { password: newPassword, oldPassword });
            if(res) {
                toast('Password has successfully changed',{ autoClose: 2000, position: 'top-right'});
                setOldPassword('');
                setNewPassword('');
            }
            setLoading(false);
        }catch(e) {
            setLoading(false);
            setErrors(e.response.data.errors);
            setTimeout(() => {
                setErrors(null);
            }, 2000);
        }
    }

    return (
        <ProfileLayout>
            <ToastContainer/>
            <form className="max-w-[800px] mx-auto space-y-3" onSubmit={update}>
                <input 
                    type="password"
                    value={oldPassword}
                    onInput={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter Old Password" 
                    className="w-full p-2 border-none rounded-sm outline-orange-200"
                />
                <input 
                    type="password"
                    value={newPassword}
                    onInput={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter New Password" 
                    className="w-full p-2 border-none rounded-sm outline-orange-200"
                />
                {errors?.password && <p className="text-start text-red-500">{errors?.password.msg}</p>}
                <button type="submit" className="w-auto px-3 py-1 bg-orange-500 rounded-lg text-white hover:bg-orange-600 duration-150 flex items-center justify-center gap-2">
                    {loading && <span className="loading"></span>}
                    <span>Update</span>
                </button>
            </form>
        </ProfileLayout>
    )
}

export default UpdatePassword;