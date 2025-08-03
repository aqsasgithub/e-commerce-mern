import { useSelector } from "react-redux"
import { selectFavoriteProduct } from "../redux/features/favorites/favoriteSlice"
import Product from "./Product.jsx"
import './Favorites.css';



const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="favorites-wrapper">
      <h1 className="favorites-heading">FAVORITE PRODUCTS</h1>
      <div className="favorites-grid">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites
