export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem("favorites");
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};

export const addFavoriteToLocalStorage = (product) => {
    const favorites = getFavoritesFromLocalStorage();
    if (!favorites.some((p) => p._id === product._id)) {
        console.log("Product to add:", product);
        favorites.push(product);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
};

export const removeFavoritesFromLocalStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage();
    const updatedFavorites = favorites.filter((product) => product._id !== productId);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};
