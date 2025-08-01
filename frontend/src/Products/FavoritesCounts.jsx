import { useSelector } from "react-redux"


const FavoritesCounts = () => {
    const favorites = useSelector(state => state.favorites)
    const favoriteCount = favorites.length;
  return <div className="absolute left-4 top-8">
    {favoriteCount>0 &&(
        <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
            {favoriteCount}
        </span>
    )}
  </div>
}

export default FavoritesCounts
