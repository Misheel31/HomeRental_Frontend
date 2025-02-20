import axios from "axios";
import React, { useState } from "react";
import { FaEnvelope, FaHome, FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/login`,
        {
          email: data.email,
          password: data.password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("ID", response.data.user._id);
        setSuccess("Login successful! Redirecting...");
        setLoading(false);

        // Check if the credentials match for admin
        if (
          data.email === "admin@gmail.com" &&
          data.password === "AdminPassword"
        ) {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.error || "An error occurred");
      } else {
        setError("Network error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="md:flex">
        {/* Left side - Marketing Content */}
        <div className="hidden md:block w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white">
          <div className="h-full flex flex-col justify-between">
            <div>
              <FaHome className="w-12 h-12 mb-8" />
              <h1 className="text-3xl font-bold mb-6">Welcome to Rentify</h1>
              <p className="text-lg opacity-90 mb-4">
                Find your perfect rental property with ease
              </p>
              <ul className="space-y-3 text-sm opacity-80">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                  Access thousands of rental listings
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                  Secure payment processing
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                  24/7 customer support
                </li>
              </ul>
            </div>
            <p className="text-sm opacity-70">
              "Finding our dream rental apartment was a breeze with Rentify!"
              <br />- Sarah Mitchell
            </p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
              Login to Your Account
            </h2>

            {/* Display error or success messages */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && (
              <p className="text-green-500 text-center mb-4">{success}</p>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="Email address"
                  required
                />
              </div>

              <div className="relative">
                <FaKey className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-600">
                  <input
                    type="checkbox"
                    className="mr-2 rounded border-gray-300"
                  />
                  Remember me
                </label>
                <a
                  href="/forgotpassword"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:bg-blue-400"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>

              <p className="text-center text-gray-600 text-sm">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                >
                  Create account
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
