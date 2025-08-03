import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader.jsx";
import { setCredentials } from "../../redux/features/auth/authSlice.js";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/userApiSlice.js";

const Register = ()=>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, {isLoading}]= useRegisterMutation();
    const { userInfo } = useSelector(state=> state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/'

    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler= async (e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            toast.error('Passwords do not match');
            return;
        }
            try {
                const res = await register({username, email, password, confirmPassword}).unwrap();
                dispatch(setCredentials({...res}));
                navigate(redirect);
                toast.success('User Successfully created');
            } catch (error) {
                console.log(error);
                toast.error(error?.data?.message || "An error occurred, please try again");
            }
    }
    return <section className="flex flex-wrap px-4 sm:px-8 md:px-[4rem] lg:px-[8rem] xl:px-[10rem]">
<img
  src="/register.svg"
  alt="Register image"
  className="hidden lg:block lg:h-[35rem] lg:w-[35%] lg:mr-[3rem] lg:mt-[5rem] rounded-lg"
/>
        <div className="mt-8 w-full lg:mt-[5rem] lg:mr-[4rem] lg:w-[55%]">
            <h1 className="text-2xl font-semibold mb-4">Register</h1>
            <form onSubmit={submitHandler} className="w-full max-w-[40rem]">
                <div className="my-[2rem]">
                    <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                    <input type="text" id="name" className="mt-1 p-2 rounded w-full"  value={username} onChange={(e)=> setUsername(e.target.value)}></input>
                </div>
                <div className="my-[2rem]">
                    <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
                    <input type="email" id="email" className="mt-1 p-2 rounded w-full" value={email} onChange={(e)=> setEmail(e.target.value)} />
                </div>
                <div className="my-[2rem]">
                    <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                    <input type="password" id="password" className="mt-1 p-2 rounded w-full" value={password} onChange={(e)=> setPassword(e.target.value)} />
                </div>
                <div className="my-[2rem]">
                    <label htmlFor="confirmpassword" className="block text-sm font-medium text-white">Confirm Password</label>
                    <input type="password" id="confirmpassword" className="mt-1 p-2 rounded w-full" onChange={(e)=> setConfirmPassword(e.target.value)} />
                </div>
                <button disabled={isLoading} type="submit" className="bg-pink-500 text-white px-4 py-2 rounder cursor-pointer my-[1rem]">{isLoading? "Registering..." : "Register"}</button>
                {isLoading && <Loader />}
            </form>
            <div className="mt-4">
                <p className="text-white">
                    Already have an account? {""}
                    <Link to={redirect? `/login?redirect=${redirect}`:'/login'} className="text-pink-500 hover:underline">
                    Login</Link>
                </p>
            </div>
            
        </div>
        
    </section>
}
export default Register;