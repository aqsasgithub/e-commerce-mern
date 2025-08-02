import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
  className="fixed top-5 right-5 z-[9999] bg-[#151515] p-2 rounded-lg"
  onClick={toggleMenu}
>
  {isMenuOpen ? (
    <FaTimes color="white" />
  ) : (
    <>
      <div className="w-6 h-0.5 bg-gray-200 my-1 mb-1"></div>
      <div className="w-6 h-0.5 bg-gray-200 my-1 mb-1"></div>
      <div className="w-6 h-0.5 bg-gray-200 my-1 mb-1"></div>
    </>
  )}
</button>


      {isMenuOpen && (
        <section className="bg-[#151515] p-4 fixed top-0 right-0 w-64 h-screen z-[9998]">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                className="block py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/productlist/:pageNumber"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/allproductslist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
