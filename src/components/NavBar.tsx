import React from "react";
import { NavLink } from "react-router-dom";

/**
 * @component Navbar
 * @description Navigation bar component.
 */
const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <NavLink to="/" className="font-bold text-xl">
          Asset Finance
        </NavLink>
        <div>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "mr-4 text-yellow-300 font-semibold" : "mr-4 hover:text-gray-300")}
          >
            Home
          </NavLink>
          <NavLink
            to="/user-list"
            className={({ isActive }) => (isActive ? "text-yellow-300 font-semibold" : "hover:text-gray-300")}
          >
            User List
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
