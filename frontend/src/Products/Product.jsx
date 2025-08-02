import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({product}) => {
  return (
    <div className="w-[30rem] ml-[2rem] p-3 relative">
      <div className="relative">
      <img
  src={`${import.meta.env.VITE_API_BASE}${product.image}`}
  alt={product.name}
  className="w-[30rem] rounded"
/>
        <HeartIcon product={product} />
      </div>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
        <h2 className="flex justify-between items-center">
            <div className="text-lg">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium px-2.5 py-0.5 pr-2 rounded-full dark:bg-pink-900 dark:text-pink-300 mr-2">
            Rs {product.price}
            </span>
            </h2>
            </Link>
      </div>
    </div> 
  )
}

export default Product;