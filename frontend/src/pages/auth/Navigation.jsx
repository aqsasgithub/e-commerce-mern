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
      {/* Desktop/Tablet Sidebar */}
      <div
        style={{ zIndex: 9999 }}
        className="hidden md:flex group fixed top-0 left-0 h-screen w-[4%] hover:w-[15%] bg-black text-white flex flex-col justify-between p-4 transition-all duration-300 overflow-x-visible overflow-y-auto"
        id="navigation-container"
      >
        <div className="flex flex-col justify-center space-y-4">
          <Link to="/" className="flex items-center transition-transform hover:translate-x-2">
            <AiOutlineHome className="mr-2 mt-[3rem] icon-size" />
            <span className="hidden group-hover:inline nav-item-name mt-[3rem]">HOME</span>
          </Link>

          <Link to="/shop" className="flex items-center transition-transform hover:translate-x-2">
            <AiOutlineShopping className="mr-2 mt-[3rem] icon-size" />
            <span className="hidden group-hover:inline nav-item-name mt-[3rem]">SHOP</span>
          </Link>

          <Link to="/cart" className="flex relative transition-transform hover:translate-x-2">
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

          <Link to="/favorite" className="flex relative transition-transform hover:translate-x-2">
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
                  <span className="hidden group-hover:inline nav-item-name">
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
                  <span className="hidden group-hover:inline nav-item-name">
                    REGISTER
                  </span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Top Navigation */}
      <div className="flex md:hidden w-full bg-black text-white px-4 py-3 justify-between items-center fixed top-0 left-0 z-50">
        <div className="flex gap-4 items-center">
          <Link to="/">
            <AiOutlineHome size={24} />
          </Link>
          <Link to="/shop">
            <AiOutlineShopping size={24} />
          </Link>
          <Link to="/cart" className="relative">
            <AiOutlineShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 px-1 text-xs text-white bg-pink-500 rounded-full">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>
          <Link to="/favorite" className="relative">
            <FaHeart size={22} />
            <div className="absolute -top-2 -right-2">
              <FavoritesCounts />
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {userInfo ? (
            <>
              <span className="text-sm">{userInfo.username}</span>
              <button onClick={logoutHandler} className="text-sm text-red-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <AiOutlineLogin size={22} />
              </Link>
              <Link to="/register">
                <AiOutlineUserAdd size={22} />
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;
