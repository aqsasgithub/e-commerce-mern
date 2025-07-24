import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader.jsx";
import { setCredentials } from "../../redux/features/auth/authSlice.js";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/userApiSlice.js";

const Profile =()=>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const {userInfo} = useSelector(state=> state.auth);

    const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();

    useEffect(()=>{
        setUsername(userInfo.username);
        setEmail(userInfo.email);
    }, [userInfo.username, userInfo.email])

 const dispatch = useDispatch();

 const submitHandler=async (e)=>{
    e.preventDefault();
    if (password!==confirmPassword) {
        toast.error('Passwords do not match');
    }
    try {
        const res = await updateProfile({_id:userInfo._id, username, email, password}).unwrap();
        dispatch(setCredentials({...res}));
        toast.success('Profile Updated Successfully');
    } catch (error) {
        console.log(error)
        toast.error(error?.data?.message || error.message);
    }
 }
 return <div className="container mx-auto p-4 mt-[10rem]">
    <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
        <form onSubmit={submitHandler}>
            <div className="mb-4">
                <label className="block text-white mb-2">Name</label>
                <input type="text" placeholder="Enter Name" className="form-input p-4 rounded-md w-full" value={username} onChange={e=> setUsername(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-white mb-2">Email</label>
                <input type="text" placeholder="Enter Email" className="form-input p-4 rounded-md w-full" value={email} onChange={e=> setEmail(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-white mb-2">Password</label>
                <input type="password" placeholder="Enter Password" className="form-input p-4 rounded-md w-full" value={password} onChange={e=> setPassword(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-white mb-2">Confirm Password</label>
                <input type="password" placeholder="Confirm Password" className="form-input p-4 rounded-md w-full" value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)} />
            </div>
            <div className="flex justify-between">
                <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">Update</button>
                <Link to='/user-orders' className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-700">My Orders</Link>
            </div>
        </form></div>
        {loadingUpdateProfile && <Loader />}
    </div>
  </div> 
}
export default Profile;