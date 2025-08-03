import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApi";
import './Shop.css';


import { setCategories, setProducts, setChecked } from '../redux/features/shop/shopSlice'; 
import Loader from "../components/Loader";
import ProductCard from "../Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector((state) => state.shop);

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter((product) =>
          product.price.toString().includes(priceFilter) || product.price === parseInt(priceFilter, 10)
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter((product) => product.brand === brand);
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value ? [...checked, id] : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="container mx-auto px-4">
      {/* Toggle for small screens */}
      <div className="mobile-only flex justify-end mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="bg-pink-600 text-white px-4 py-2 rounded shadow-md"
        >
          {showMobileFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>
  
      {/* Filters + Products layout */}
      <div className="shop-container">
  {/* Filters Sidebar */}
  <div className={`shop-filters ${showMobileFilters ? "block" : "hidden"} md:block`}>
    <h2 className="text-center py-2 bg-black rounded-full text-white mb-2 text-sm md:text-base">
      Filter by Categories
    </h2>
    <div className="space-y-2">
      {categories?.map((c) => (
        <div key={c._id} className="flex items-center">
          <input
            type="checkbox"
            id={c._id}
            onChange={(e) => handleCheck(e.target.checked, c._id)}
            className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded"
          />
          <label htmlFor={c._id} className="ml-2 text-sm text-white">
            {c.name}
          </label>
        </div>
      ))}
    </div>

    <h2 className="text-center py-2 mt-6 bg-black rounded-full text-white mb-2 text-sm md:text-base">
      Filter by Brands
    </h2>
    <div className="space-y-3">
      {uniqueBrands?.map((brand) => (
        <div key={brand} className="flex items-center">
          <input
            type="radio"
            id={brand}
            name="brand"
            onChange={() => handleBrandClick(brand)}
            className="w-4 h-4 text-pink-400"
          />
          <label htmlFor={brand} className="ml-2 text-sm text-white">
            {brand}
          </label>
        </div>
      ))}
    </div>

    <h2 className="text-center py-2 mt-6 bg-black rounded-full text-white mb-2 text-sm md:text-base">
      Filter by Price
    </h2>
    <input
      type="text"
      placeholder="Enter Price"
      value={priceFilter}
      onChange={handlePriceChange}
      className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
    />

    <button
      onClick={() => window.location.reload()}
      className="w-full mt-4 border text-white py-2 rounded hover:bg-gray-800"
    >
      Reset
    </button>
  </div>

  {/* Products Section */}
  <div className="shop-products">
    <h2 className="text-center mb-4 text-lg md:text-xl font-semibold text-white">
      {products?.length} Products
    </h2>
    <div className="shop-grid gap-6 justify-items-center">
    {products.length === 0 ? (
        <Loader />
      ) : (
        products.map((p) => <ProductCard key={p._id} p={p} />)
      )}
    </div>
  </div>
</div>

    </div>
  );
  
};

export default Shop;
