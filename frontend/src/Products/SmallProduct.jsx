import { Link } from "react-router-dom"
import HeartIcon from "./HeartIcon";

const SmallProduct = ({product}) => {
  return (
<div className="w-full max-w-sm p-3">
<div className="relative">
      <img
  src={`${import.meta.env.VITE_API_BASE}${product.image}`}
  alt={product.name}
  className="h-auto rounded"
/>
      <HeartIcon product={product} />
      <div className="p-5">
        <Link to={`/product/${product._id}`}>
        <h2 className="flex justify-between items-center">
            <div className="text-sm font-medium truncate max-w-[12rem]">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-lg dark:bg-pink-900 dark:text-pink-300">Rs {product.price}</span>
        </h2>
        </Link>

      </div>
    </div>
    </div>

  )
}

export default SmallProduct;