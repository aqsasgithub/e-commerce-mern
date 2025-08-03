import { useState } from "react";
import './Navigation.css';
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShopping
} from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../redux/api/userApiSlice.js';
import { logout } from "../../redux/features/auth/authSlice.js";
import FavoritesCounts from "../../Products/FavoritesCounts.jsx";

const Navigation = () => {
  const { userInfo } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div
        style={{ zIndex: 9999 }}
        className="group md:flex fixed top-0 left-0 h-screen w-[4%] hover:w-[15%] bg-black text-white flex-col justify-between p-4 transition-all duration-300 overflow-x-visible overflow-y-auto"
        id="navigation-container"
      >
        <div className="flex flex-col justify-center space-y-4">
          <Link to="/" className="group flex items-center transition-transform hover:translate-x-2">
            <AiOutlineHome className="mr-2 mt-[3rem] icon-size" />
            <span className="hidden group-hover:inline nav-item-name mt-[3rem]">HOME</span>
          </Link>

          <Link to="/shop" className="group flex items-center transition-transform hover:translate-x-2">
            <AiOutlineShopping className="mr-2 mt-[3rem] icon-size" />
            <span className="hidden group-hover:inline nav-item-name mt-[3rem]">SHOP</span>
          </Link>

          <Link to="/cart" className="group flex relative transition-transform hover:translate-x-2 badge-container">
            <div className="flex items-center mt-[3rem]">
              <AiOutlineShoppingCart className="mr-2 icon-size" />
              <span className="hidden group-hover:inline nav-item-name">CART</span>
            </div>
            <div className="absolute top-2 right-2">
              {cartItems.length > 0 && (
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </div>
          </Link>

          <Link to="/favorite" className="group flex relative transition-transform hover:translate-x-2 badge-count">
            <div className="flex items-center mt-[3rem]">
              <FaHeart className="mr-2 icon-size" />
              <span className="hidden group-hover:inline nav-item-name">FAVORITE</span>
            </div>
            <div className="absolute top-2 right-2">
              <FavoritesCounts />
            </div>
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-gray-800 focus:outline-none"
          >
            {userInfo ? (
              <span className="text-white">{userInfo.username}</span>
            ) : (
              <></>
            )}
            {userInfo && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            )}
          </button>

          {dropdownOpen && userInfo && (
            <ul
              className="absolute bottom-full mb-2 right-0 mr-14 bg-white text-gray-600 space-y-2 p-2 rounded-md shadow-md z-[9999]"
            >
              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/productlist/:pageNumber"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/categorylist"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/orderlist"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/userlist"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Users
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
          {!userInfo && (
            <ul>
              <li>
                <Link
                  to="/login"
                  className="flex items-center mt-5 transition-transform hover:translate-x-2"
                >
                  <AiOutlineLogin className="mr-2" size={26} />
                  <span className="group-hover:inline nav-item-name">
                    LOGIN
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center mt-5 transition-transform hover:translate-x-2"
                >
                  <AiOutlineUserAdd className="mr-2" size={26} />
                  <span className="group-hover:inline nav-item-name">
                    REGISTER
                  </span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      <nav className="md:hidden fixed top-0 left-0 right-0 text-white flex justify-between items-center px-4 py-3 z-[9999]" id="top-nav">
      <div className="flex items-center space-x-5">
          <Link to="/" className="flex flex-col items-center">
            <AiOutlineHome size={22} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/shop" className="flex flex-col items-center">
            <AiOutlineShopping size={22} />
            <span className="text-xs mt-1">Shop</span>
          </Link>
          <Link to="/cart" className="relative flex flex-col items-center">
            <AiOutlineShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-2 px-1 text-xs text-white bg-pink-500 rounded-full">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
            <span className="text-xs mt-1">Cart</span>
          </Link>
          <Link to="/favorite" className="relative flex flex-col items-center">
            <FaHeart size={20} />
            <div className="absolute -top-1 -right-2">
              <FavoritesCounts />
            </div>
            <span className="text-xs mt-1">Favorite</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
        {userInfo && (
  <div className="relative dropdown-wrapper">
    <button onClick={toggleDropdown} className="flex items-center">
      <span className="text-sm">{userInfo.username}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-4 w-4 ml-1 ${dropdownOpen ? "rotate-180" : ""}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
        />
      </svg>
    </button>

    {dropdownOpen && (
      <ul className="dropdown-menu">
        {userInfo.isAdmin && (
          <>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/productlist/:pageNumber">Products</Link></li>
            <li><Link to="/admin/categorylist">Category</Link></li>
            <li><Link to="/admin/orderlist">Orders</Link></li>
            <li><Link to="/admin/userlist">Users</Link></li>
          </>
        )}
        <li><Link to="/profile">Profile</Link></li>
        <li><button onClick={logoutHandler}>Logout</button></li>
      </ul>
    )}
  </div>
)}
          {userInfo ? (
            <>
              <button
                onClick={logoutHandler}
                className="text-sm text-pink-500 hover:text-pink-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex flex-col items-center">
                <AiOutlineLogin size={22} />
                <span className="text-xs mt-1">Login</span>
              </Link>
              <Link to="/register" className="flex flex-col items-center">
                <AiOutlineUserAdd size={22} />
                <span className="text-xs mt-1">Register</span>
              </Link>
            </>
          )}
      

        </div>
      </nav>
    </>
  );
};

export default Navigation;

