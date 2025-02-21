import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Navbar = ({ searchTerm, onSearchChange }) => {
  const { isLoggedIn, username, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="w-64 p-2 border border-gray-300 rounded-md"
                placeholder="Search for properties..."
                value={searchTerm}
                onChange={onSearchChange}
              />
            </div>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-white flex items-center space-x-2 focus:outline-none"
                >
                  <FaUserCircle size={24} />
                  <span>{username}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/profile");
                      }}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/bookings");
                      }}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                    >
                      Bookings
                    </button>
                    <button
                      onClick={logout}
                      className="block px-4 py-2 text-gray-800 hover:bg-red-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
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
    </>
  );
};

export default Navbar;
