import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSlidersH } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
// import PriceFilter from "./PriceFilter";

const Navbar = ({ searchTerm, onSearchChange }) => {
  const { isLoggedIn, username, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [showPriceFilter, setShowPriceFilter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(
      "Navbar Rendered - isLoggedIn:",
      isLoggedIn,
      "Username:",
      username
    );
  }, [isLoggedIn, username]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );

      if (response.status === 200 && response.data.token) {
        login(response.data.token, response.data.user.username);
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-10 shadow-md">
        <div className="flex justify-between items-center">
          <a href="/home" className="text-white text-xl font-bold">
            Rentify
          </a>
          <div className="space-x-4 flex items-center">
            <a href="/home" className="text-white hover:text-gray-300">
              Home
            </a>
            <a href="/about" className="text-white hover:text-gray-300">
              About
            </a>
            <a href="/contact" className="text-white hover:text-gray-300">
              Contact
            </a>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="w-64 p-2 border border-gray-300 rounded-md"
                placeholder="Search for properties..."
                value={searchTerm}
                onChange={onSearchChange}
              />
              <button
                onClick={() => navigate("/bookings")} 
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center space-x-2"
              >
                <FaSlidersH size={16} />
                <span>Bookings</span>
              </button>
            </div>

            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">Welcome, {username}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* PriceFilter Modal
      <PriceFilter
        isOpen={showPriceFilter}
        onClose={() => setShowPriceFilter(false)}
        onApply={(filters) => {
          console.log("Applied Filters:", filters);
          setShowPriceFilter(false);
        }}
      /> */}
    </>
  );
};

export default Navbar;
