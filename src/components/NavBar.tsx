import React from "react";
import { Link } from "react-router-dom";

/**
 * @component Navbar
 * @description Navigation bar component for the application.
 */
const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold">
          Asset Finance
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">
            Home
          </Link>
          <Link to="/add-application" className="hover:bg-blue-700 px-3 py-2 rounded">
            Add Application
          </Link>
          <Link to="/add-user" className="hover:bg-blue-700 px-3 py-2 rounded">
            Add User
          </Link>
          <Link to="/user-list" className="hover:bg-blue-700 px-3 py-2 rounded">
            User List
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
