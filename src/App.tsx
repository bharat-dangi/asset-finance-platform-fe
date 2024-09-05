import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserListPage from "./pages/UserListPage";
import Navbar from "./components/NavBar";

/**
 * @component App
 * @description The main entry component for the React application.
 */
const App: React.FC = () => {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        {/* Include Navbar */}
        <Navbar />
        <main className="flex-grow container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user-list" element={<UserListPage />} /> {/* New Route for User List Page */}
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white text-center py-4">
          <p>&copy; 2024 Asset Finance Specialists. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
