import { useState, useEffect } from "react";
// import '../../index.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/userApiSlice.js";
import { setCredentials } from "../../redux/features/auth/authSlice.js";
import { toast } from "react-toastify";
import Loader from "../../components/Loader.jsx";


const Login =()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();
    const {userInfo} = useSelector(state =>state.auth);
    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(()=>{
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
    
        try {
            const res = await login({ email, password }).unwrap();
            console.log(res);
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
            toast.success('Logged in Successfully');
        } catch (error) {
            const errorMessage = error?.data?.message === 'Invalid credentials' 
                ? 'Password is incorrect. Please try again.' 
                : error?.data?.message || "An error occurred. Please try again.";
            
            toast.error(errorMessage);
        }
    }
    

    return <div>
    <section className="pl-[10rem] flex flex-wrap">
    <img src="/login.svg" className="h-[40rem] w-[35%] mr-[3rem] mt-[5rem] xl-block md-hidden sm-hidden rounded-lg" alt="Login image" />
        <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
        <form className="container w-[40rem]" onSubmit={submitHandler}>
            <div className="my-[2rem]">
                <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
                <input type="email" id="email" className="mt-1 p-2 rounded-lg w-full" value={email} onChange={e=> setEmail(e.target.value)} />
            </div>
            <div className="my-[2rem]">
                <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                <input type="password" id="password" className="mt-1 p-2 rounded-lg w-full" value={password} onChange={e=> setPassword(e.target.value)} />
            </div>
            <button disabled={isLoading} type="submit" className="bg-pink-500 text-white px-4 py-2 rounded-lg cursor-pointer my-[1rem]">{isLoading ? "Signing In.." : "Sign In"}</button>
            {isLoading && <Loader />}
        </form>
        <div className="mt-4">
            <p className="text-white">
                New Customer ? {" "}
                <Link to={redirect? `/register?redirect=${redirect}` : '/register'} className="text-pink-500 hover:underline">Register Now</Link>
            </p>
        </div>
        </div>
    </section>
        </div> 
}
export default Login;