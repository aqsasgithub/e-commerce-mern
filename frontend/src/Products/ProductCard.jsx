import { Link } from "react-router-dom"
import {AiOutlineShoppingCart} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import {toast} from "react-toastify";
import HeartIcon from "./HeartIcon"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ProductCard = ({p}) => {
    const dispatch = useDispatch();
    const addToCartHandler = (product, qty)=>{
        dispatch(addToCart({...product, qty}));
        console.log("Add to cart clicked")
        toast.success('Item added successfully', {
            position: 'top-right', 
            autoClose: 2000,
          });
    }
  return <div className="max-w-sm w-full relative bg-[#1A1A1A] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

    <section className="relative">
        <Link to={`/product/${p._id}`}>
        <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
            {p?.brand}</span>
            <img
  src={`${import.meta.env.VITE_API_BASE}${p.image}`}
  alt={p.name}
  className="cursor-pointer w-full h-auto object-cover aspect-[16/9]"
/>

            </Link>
            <HeartIcon product={p} />
    </section>
    <div className="p-5">
    <div className="flex justify-between">
        <h5 className="mb-5 text-xl text-white dark:text-white">
            {p?.name}
        </h5>
        <p className="text-black font-semibold text-pink-500 ml-4">{p?.price?.toLocaleString('pkr', {
            style: 'currency',
            currency: 'PKR',
        })}</p>
        </div>
        <p className="md-3 font-normal text-[#CFCFCF] truncate">
  {p?.description}
</p>

        <section className="flex justify-between items-center">
            <Link to={`/product/${p._id}`} className="inline-flex items-center mt-3 px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">Read More
            
            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
            </Link>
            <button className="p-2 rounded-full" onClick={()=> addToCartHandler(p, 1)}>
                <AiOutlineShoppingCart size={25} /></button>
        </section>
    </div>
  </div>    
}

export default ProductCard;